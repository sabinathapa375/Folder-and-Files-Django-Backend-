import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { useLocation } from "react-router-dom";

const FileList = () => {
  const location = useLocation();
  const { state } = location;
  const { files, title } = state || { files: [], title: 'Files' };  

  return (
    <div>
      <Typography variant="h3">{title}</Typography>
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
    </div>
  );
};

export default FileList;
