import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const FileUpload = () => {
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
    <div>
      <h3>Upload Files</h3>
      <form onSubmit={handleSubmit}>
        <label>
          File Name:
          <input type="text" value={fileName} onChange={(e) => setFileName(e.target.value)} />
        </label><br/>

        <label>
          File Type:
          <select value={fileType} onChange={(e) => setFileType(e.target.value)}>
            <option value="Contract">Contract</option>
            <option value="Document">Document</option>
          </select><br/>
        </label>

        {isSuperuser && (
          <label>
            Select User:
            <select value={selectedUser ? selectedUser.id : ""} onChange={(e) => setSelectedUser(users.find(user => user.id === parseInt(e.target.value)) || null)}>
              <option value="">-- Select User --</option>
              {Array.isArray(users) && users.length > 0 && users.map((user) => (
                <option key={user.id} value={user.id}>{user.username}</option>
              ))}
            </select><br/>
          </label>
        )}

        <label>
          Choose File:
          <input type="file" onChange={handleFileChange} />
        </label><br/>

        <button type="submit">Upload File</button>
      </form>
    </div>
  );
}

export default FileUpload;
