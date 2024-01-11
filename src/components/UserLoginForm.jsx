import axios from "axios";
import React, { useState } from "react";
import Cookies from 'js-cookie'
import { Container, Box, Card, CardContent, Typography, Button, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import backgroundImage from '../assets/images/bg.jpg';


const UserLoginForm=()=>{
    const [username, setusername]= useState('');
    const [password, setpassword]= useState('');
    const [showPassword, setShowPassword] = useState(false);
 
    const handleUsernameChange=(e)=>{
        setusername(e.target.value)

    }
    const handlePasswordChange=(e)=>{
        setpassword(e.target.value)
    }
    const handlePasswordVisibility=()=>{
        setShowPassword(!showPassword); 
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();

        const user={
            username : username,
            password : password
        }
        try{
            const {data} = await axios.post('http://localhost:8000/api/accounts/login/', user)
             
            Cookies.set('access_token', data.data.access_token);
            Cookies.set('refresh_token', data.data.refresh_token);

            window.location.href = '/file-upload';
            
        }
        catch (error){
            alert('Username or Password Incorrect')
        }

    }
    return(

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
            }}>
            <Card sx={{ margin: 'auto',  
          
                padding: 1,
                height: '100%',
                display: 'flex',  
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', }}>
                <CardContent>
                <Container maxWidth="xs">
            <Typography variant="h4" textAlign="center" color="red"><b>Login</b></Typography>
            
        <form onSubmit={handleSubmit}>
            
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="username"
                label="Username"
                value={username}
                onChange={handleUsernameChange}/>
            
            <TextField
                type="password"
                variant="outlined"
                margin="normal"
                fullWidth
                id="password"
                label="Password"
                value={password}
                onChange={handlePasswordChange}
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={handlePasswordVisibility}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

            <Button 
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                fullWidth>Login</Button>

         </form>
         </Container>
                </CardContent>
                </Card>
                </Box>
       
    )
}
export default UserLoginForm;