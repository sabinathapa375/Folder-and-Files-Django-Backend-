import React from "react";
import { Table, TableBody, Box, Button, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { useLocation } from "react-router-dom";
import Header from "./Header"

const FileList = () => {
  const location = useLocation();
  const { state } = location;
  const { files, title } = state || { files: [], title: 'Files' };  

  const handleGoBackClick = ()=>{
    window.location.href='admin-file-list/'
  }
  return (
    <div>
      <Header/>
      <Typography 
          variant="h4" 
          color={'#8A2BE2'} 
          textAlign={'center'}
          sx={{mt:2}}>{title}</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>File Type</TableCell>
              <TableCell>File</TableCell>
              <TableCell>Folder</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {files && files.map((file) => (
              <TableRow key={file.id}>
                <TableCell>{file.name}</TableCell>
                <TableCell>{file.file_type}</TableCell>
                <TableCell>{file.file ? <a href={file.file}>{file.name}</a> : 'No File'}</TableCell>
                <TableCell>{file.folder ? file.folder.name : 'No Folder'}</TableCell>
                <TableCell>{file.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box>
      <Button onClick={handleGoBackClick}>&#9664; GO BACK</Button>
      </Box>
    </div>
  );
};

export default FileList;
