import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Card , Box, InputAdornment} from "@mui/material";
import backgroundImage from '../assets/images/bg.jpg';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import Person3OutlinedIcon from '@mui/icons-material/Person3Outlined';


const UserFileUpload = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('');
  const [isSuperuser, setIsSuperuser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const accessToken = Cookies.get('access_token');
      try {
        const response = await axios.get('http://localhost:8000/api/filemanagement/users/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        alert('Error fetching users', error);
      }
    };

    const checkIsSuperuser = async () => {
      const accessToken = Cookies.get('access_token');
      try {
        const response = await axios.get('http://localhost:8000/api/filemanagement/is-superuser/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setIsSuperuser(response.data);
      } catch (error) {
        alert('Error checking superuser status', error);
      }
    };

    fetchUsers();
    checkIsSuperuser();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', fileName);
    formData.append('file_type', fileType);
    formData.append('file', file, file.name);

    if (isSuperuser) {
      formData.append('for_user_id', selectedUser.id);
    }
    const accessToken = Cookies.get('access_token');

    try {
      await axios.post('http://localhost:8000/api/filemanagement/files/', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded successfully');
      // window.location.href = '/file-list';
    } catch (error) {
      alert('Error uploading file', error);
    }
  };

  return (
     
      <Box sx={{
        backgroundImage:`url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '.button-class':{
          marginTop:1,
          marginBottom:0.5,
        }
        }}>

        <Card sx={{margin: 'auto',
            padding: 1,
            height: '100%',
            display: 'flex',  
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', }}>
      <Typography variant="h5" color="red"><b>Upload Files</b></Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="File Name"
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          InputProps={{
            startAdornment:(
              <InputAdornment position="start">
                  <InsertDriveFileOutlinedIcon/>
              </InputAdornment>
            ),
          }}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="file-type-label">File Type</InputLabel>
          <Select
            labelId="file-type-label"
            value={fileType}
            margin="normal"
           
            onChange={(e) => setFileType(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <ArticleOutlinedIcon/>
              </InputAdornment>
            }>
            <MenuItem value="Contract">Contract</MenuItem>
            <MenuItem value="Document">Document</MenuItem>
          </Select>
        </FormControl>

        {isSuperuser && (
          <FormControl fullWidth margin="normal">
            <InputLabel id="select-user-label">Select User</InputLabel>
            <Select
              labelId="select-user-label"
               
              value={selectedUser ? selectedUser.id : ""}
              onChange={(e) => setSelectedUser(users.find(user => user.id === parseInt(e.target.value)) || null)}
              startAdornment={
                <InputAdornment position="start">
                    <Person3OutlinedIcon/>
                </InputAdornment>
              }
            >
              <MenuItem value="">-- Select User --</MenuItem>
              {Array.isArray(users) && users.length > 0 && users.map((user) => (
                <MenuItem key={user.id} value={user.id}>{user.username}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <input type="file" onChange={handleFileChange} />

        <Button className="button-class" type="submit" variant="contained" color="primary" fullWidth >
          Upload File
        </Button>
      </form>
      </Card>
      </Box>
     
  );
}

export default UserFileUpload;
