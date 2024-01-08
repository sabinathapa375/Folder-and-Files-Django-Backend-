import axios from "axios";
import React, { useState } from "react";
import Cookies from 'js-cookie'
import { Container, CssBaseline, Typography, Button, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";


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
        <Container maxWidth="xs">
            <Typography variant="h3" textAlign="center">Login</Typography>
            
        <form onSubmit={handleSubmit}>
            
            <TextField
                variant="filled"
                margin="normal"
                fullWidth
                id="username"
                label="Username"
                value={username}
                onChange={handleUsernameChange}/>
            
            <TextField
                type="password"
                variant="filled"
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
    )
}
export default UserLoginForm;