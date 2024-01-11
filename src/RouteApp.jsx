import React from "react";
import UserRegistrationForm from "./components/UserRegistrationForm";
import UserLoginForm from "./components/UserLoginForm";
import UserFileUpload from "./components/UserFileUpload";
import AdminFileList from "./components/AdminFileList";
import FolderCreate from "./components/FolderCreate";
import UserFile from "./components/UserFile";
import FileList from "./components/FileList";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const RouteApp=()=>{
  
    return(
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/user-signup" element={<UserRegistrationForm/>}/>
            <Route path="/user-login" element={<UserLoginForm/>}/>
            <Route path="/file-upload" element={<UserFileUpload/>}/>
            <Route path="/admin-file-list" element={<AdminFileList/>}/>
            <Route path="/folder-create" element={<FolderCreate/>}/>
            <Route path="/user-file" element={<UserFile/>}/>
            <Route path="/files" element={<FileList />}/>
           </Routes>
        </div>
      </Router>
    );
  }
  export default RouteApp;