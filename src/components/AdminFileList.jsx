import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AdminFileList = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [users, setUsers] = useState([]);
  const [clientFiles, setClientFiles] = useState([]);   
  const [cpaFiles, setCpaFiles] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const accessToken = Cookies.get('access_token');
      try {
        const response = await axios.get('http://localhost:8000/api/filemanagement/admin-file-list/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchData();
  }, []);

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const accessToken = Cookies.get('access_token');

    try {
      const response = await axios.get('http://localhost:8000/api/filemanagement/admin-file-list/', {
        params: {
          selected_user: selectedUser,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setClientFiles(response.data.client_files);   
      setCpaFiles(response.data.cpa_files);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };
  return (
    <div>
      <h1>Admin File List</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="selected_user">Select User:</label>
        <select name="selected_user" id="selected_user" onChange={handleUserChange}>
          <option value="" disabled>Select user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
        <button type="submit" disabled={!selectedUser}>
          Show Files
        </button>
      </form>
      { clientFiles.length > 0 && (
        <div>
            <h4>Client Files</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>File Type</th>
                            <th>File</th>
                            <th>Folder</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientFiles.map((file)=>(
                          <tr key={file.id}>
                            <td>{file.name}</td>
                            <td>{file.file_type}</td>
                            <td>{file.file ? <a href={file.file}>{file.name}</a>: 'No File'}</td>
                            <td>{file.folder? file.folder.name: 'No Folder'}</td>
                            <td>{file.created_at}</td>
                          </tr>  
                        ))}
                    </tbody>
                </table>
                {cpaFiles.length > 0 && (
                <div>
                    <h4>CPA Files</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>File Type</th>
                                <th>File</th>
                                <th>Folder</th>
                                <th>Created At</th>
                            </tr>
                        </thead>
                        <tbody>{cpaFiles.map((file)=>(
                          <tr key={file.id}>
                            <td>{file.name}</td>
                            <td>{file.file_type}</td>
                            <td>{file.file ? <a href={file.file}>{file.name}</a>: 'No File'}</td>
                            <td>{file.folder? file.folder.name: 'No Folder'}</td>
                            <td>{file.created_at}</td>
                          </tr>  
                        ))}</tbody>
                    </table>
                </div>)}
        </div>       
      )}
    </div>
  );
};
export default AdminFileList;
