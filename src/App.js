import React from "react";
import UserRegistrationForm from "./components/UserRegistrationForm";
import UserLoginForm from "./components/UserLoginForm";
import UserFileUpload from "./components/UserFileUpload";
import FileList from "./components/FileTable";
import AdminFileList from "./components/AdminFileList";
 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const App=()=>{
  return(
    <Router>
      <div>
        <Routes>
          <Route path="/user-signup" element={<UserRegistrationForm/>}/>
          <Route path="/user-login" element={<UserLoginForm/>}/>
          <Route path="/file-upload" element={<UserFileUpload/>}/>
          <Route path="/file-list" element={<FileList/>}/>
          <Route path="/admin-file-list" element={<AdminFileList/>}/>
         </Routes>
      </div>
    </Router>
  );
}
export default App;

