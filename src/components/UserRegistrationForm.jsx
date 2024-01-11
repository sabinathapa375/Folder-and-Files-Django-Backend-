import React, {useState} from "react";
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { Card, Typography , Button, Box, CardContent} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import backgroundImage from '../assets/images/bg.jpg';
 

const UserRegistrationForm=()=>{
    const [formData, setformData]=useState({
        username : '',
        password : '',
        showPassword: false,
    });

    const handleChange=(e)=>{
        setformData({...formData,[e.target.name]:e.target.value});
    }

    const handlePasswordVisibility=()=>{
        setformData({...formData, showPassword: !formData.showPassword});
    };
    const handleSubmit=async(e)=>{
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/accounts/signup/', formData,
            {
                headers:{
                    'Content-Type':'application/json',
                    'Origin':'http://localhost:3000',
                }
            });
            console.log(response)
            window.location.href=('/user-login');
           } catch (error) {
            console.error('Error creating user:', error.response.formData );
           }
    };
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
            alignItems: 'center'
            }}>
            <Card sx={{ marginLeft: 'auto',  
        marginRight: 9.05,  
        padding: 1,
        height: '100%',
        display: 'flex',  
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', }}>
   
                <CardContent>

            <Typography variant="h4" align="center">Sign Up</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    variant = "filled"
                    margin = "normal"
                    fullWidth
                    id = "username"
                    label = "Username"
                    name = "username"
                    value = {formData.username}
                    onChange = {handleChange}/>

                <TextField
                    variant="filled"
                    margin="normal"
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    type={formData.showPassword?'text':'password'}
                    onChange={handleChange}
                    InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onClick={handlePasswordVisibility}
                            >
                              {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}>Register</Button>
        </form>
                </CardContent>
            </Card>
        </Box>
    )
}
export default UserRegistrationForm;