import React from "react";
import { useLocation } from "react-router-dom";
import Header from './Header';
import { Typography, Button, Box } from "@mui/material";

const AfterLogin = () => {
    const location = useLocation();
    const username = location.search.split("=")[1];

    const handleUploadButton=()=>{
        window.location.href='file-upload/'

    }

    const handleListButton=()=>{
        if (username==='admin' || username === 'superuser'){
            window.location.href='admin-file-list/'
        }
        else{
            window.location.href='user-file/'
        }

        

    }
    

    return (
      <Box>
        <Header/>
        <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
       }}>
         
       
            <Typography variant="h3" 
            gutterBottom
            color={'#8A2BE2'}>
            Welcome, {username}
            </Typography>

            
            <Typography>Which action do you want to perform?</Typography>

            <Button variant="contained" 
                    sx={{ m: 1 }}
                    onClick={handleUploadButton}
                    style={{ backgroundColor: '#8A2BE2', color: '#FFF' }}>
                Upload Files
            </Button>

            <Button variant="contained"
                    sx={{ m: 1 }}
                    onClick={handleListButton}
                    style={{ backgroundColor: '#8A2BE2', color: '#FFF' }}
                    >
                List Files
            </Button>
             
        
       </Box>
      </Box>
    );
    };

    export default AfterLogin;