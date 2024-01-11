import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
const FolderComponent = () => {
  const [folders, setFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState('');

  useEffect(() => {
    const accessToken = Cookies.get('access_token');

    const fetchFolders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/filemanagement/folders/',{
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
        setFolders(response.data);
      } catch (error) {
        console.error('Error fetching folders:', error);
      }
    };

    fetchFolders();
  }, []);

  const handleCreateFolder = async () => {
    const accessToken = Cookies.get('access_token');

    try {
       const response = await axios.post('http://localhost:8000/api/filemanagement/folders/', { name: newFolderName },{
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        }},)
      setFolders([...folders, response.data]);
      setNewFolderName('');
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  };

  return (
    <div>
      <h1>Folders</h1>
      <ul>
        {folders.map(folder => (
          <li key={folder.id}>{folder.name}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
        />
        <button onClick={handleCreateFolder}>Create Folder</button>
      </div>
    </div>
  );
};

export default FolderComponent;
