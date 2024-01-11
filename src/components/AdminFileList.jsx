import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FormControl,  MenuItem, Select, Typography } from '@mui/material';
import FolderImage from '../assets/images/folder.jpg';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const AdminFileList = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

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

  const handleFolderClick = async (fileType) => {
    if (selectedUser) {
      try {
        const accessToken = Cookies.get('access_token');
        const response = await axios.get('http://localhost:8000/api/filemanagement/admin-file-list/', {
          params: {
            selected_user: selectedUser,
            file_type: fileType,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const filesData = fileType === 'client_files' ? response.data.client_files : response.data.cpa_files;

        if (filesData && filesData.length > 0) {
          navigate('/files', {
            state: {
              files: filesData,
              title: fileType === 'client_files' ? 'Client Files' : 'CPA Files',
            },
          });
        } else {
          alert('Files is null, undefined, or empty');
        }
      } catch (error) {
        alert('Error in fetching files.');
      }
    }
  };

  return (
    <div>
      <Header/>
      <Typography 
          variant="h4" 
          textAlign={'center'} 
          color={'#8A2BE2'}
          sx={{mt:5}}
          >Admin File List
      </Typography>
      <div>
        <FormControl textAlign={'center'}>
          <Typography variant="h5" 
          textAlign={'center'} 
          color={'#8A2BE2'}
          sx={{mt:5}}
                      >First Select the User</Typography>
           
          <Select
             
            id="selected_user"
            value={selectedUser}
            onChange={handleUserChange}
            label="Select User"
          >
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.username}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <figure>
          <img
            src={FolderImage}
            alt="Client Folder"
            onClick={() => handleFolderClick('client_files')}
            style={{ cursor: 'pointer' }}
          />
          <figcaption>Client Folder</figcaption>
        </figure>

        <figure>
          <img
            src={FolderImage}
            alt="CPA Folder"
            onClick={() => handleFolderClick('cpa_files')}
            style={{ cursor: 'pointer' }}
          />
          <figcaption>CPA Folder</figcaption>
        </figure>
      </div>
    </div>
  );
};

export default AdminFileList;
