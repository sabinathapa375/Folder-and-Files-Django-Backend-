import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const UserFile = () => {
  const [clientFiles, setClientFiles] = useState([]);
  const [cpaFiles, setCpaFiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = Cookies.get('access_token');
      try {
        const response = await axios.get('http://localhost:8000/api/filemanagement/files/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setClientFiles(response.data.client_files);
        setCpaFiles(response.data.cpa_files);
      } catch (error) {
        alert('Error fetching files.', error);
      }
    };
    fetchData();
  }, []);
  
  const handleDelete = async (id) => {
    const accessToken = Cookies.get('access_token');
    try {
      await axios.delete(`http://localhost:8000/api/filemanagement/files/${id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setClientFiles(clientFiles.filter(file => file.id !== id));
      setCpaFiles(cpaFiles.filter(file => file.id !== id));
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert("You do not have permission to delete this file.")
      } else {
        alert("Delete unsuccessful.")
      }
    }
  }

  return (
    <div>
      <h1>User File List</h1>
       
        <div>
          <h4>Client Files</h4>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>File Type</TableCell>
                  <TableCell>File</TableCell>
                  <TableCell>Folder</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clientFiles.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell>{file.name}</TableCell>
                    <TableCell>{file.file_type}</TableCell>
                    <TableCell>{file.file ? <a href={file.file}>{file.name}</a> : 'No File'}</TableCell>
                    <TableCell>{file.folder ? file.folder.name : 'No Folder'}</TableCell>
                    <TableCell>{file.created_at}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleDelete(file.id)} variant="outlined" color="secondary">Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <h4>CPA Files</h4>
          <TableContainer>
            <Table>
            <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>File Type</TableCell>
                  <TableCell>File</TableCell>
                  <TableCell>Folder</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cpaFiles.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell>{file.name}</TableCell>
                    <TableCell>{file.file_type}</TableCell>
                    <TableCell>{file.file ? <a href={file.file}>{file.name}</a> : 'No File'}</TableCell>
                    <TableCell>{file.folder ? file.folder.name : 'No Folder'}</TableCell>
                    <TableCell>{file.created_at}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleDelete(file.id)} variant="outlined" color="secondary">Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          
        </div>
         
    
    </div>
  );
};

export default UserFile;
