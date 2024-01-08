import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const FileTable=()=>{
    const [files, setFiles] = useState([]);

    useEffect(()=>{

        const fetchData= async()=>{
            const accessToken = Cookies.get('access_token');

            try{
                const response = await axios.get('http://localhost:8000/api/filemanagement/files/',{
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                    },
                  });
                setFiles(response.data);
             }catch (error){
                console.log('Error Fetching data', error);
            }
        };
        fetchData();
    },[]);
    
    const handleDelete = async (id) => {
        const accessToken = Cookies.get('access_token');

        try {
          await axios.delete(`http://localhost:8000/api/filemanagement/files/${id}/`,{
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setFiles(files.filter(file => file.id !== id));
        } catch (error) {
           if (error.response && error.response.status === 403){
            alert("You do not have permission to delete this file.")
           } 
           else{
            alert("Delete unsuccessful.")
           }
        }
      }
    return(
        <div>
            <h3>File Table</h3>
            <table>
                <thead>
                    <tr>
                       
                        <th>Name</th>
                        <th>File Type</th>
                        <th>File</th>
                        <th>Folder</th>
                        <th>Created at</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {files.map((file)=>(
                        <tr key={file.id}>
                           
                            <td>{file.name}</td>
                            <td>{file.file_type}</td>
                            <td>{file.file ? <a href={file.file}>{file.name}</a> : 'No File'}</td>
                            <td>{file.folder? file.folder.name: 'No Folder'}</td>
                            <td>{file.created_at}</td>
                            <td>
                                <button onClick={() => handleDelete(file.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

};
export default FileTable;