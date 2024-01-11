import React from "react";
import {Button, Typography, Container, Box} from '@mui/material';
import backgroundImage from '../assets/images/dashboard.jpg';
const Dashboard = ()=>{
    const handleSignUpClick=()=>{
        window.location.href="user-signup/"
      }
    const handleLoginClick = ()=>{
        window.location.href="user-login/"
    }
    return(
        <Box sx={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize : 'cover',
            backgroundRepeat : 'no-repeat',
            minHeight: '100vh' ,
            display: 'flex',
            flexDirection : 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
        <Container sx={{
            display: 'flex',
            justifyContent:'space-between',
            paddingBottom:0.2,
        }}>
            <Container>
                <Typography variant="h4"style={{ fontFamily: 'Cursive' }}>New to File Management?</Typography>
                <Button variant="contained" style={{ backgroundColor: '#8A2BE2', color: '#FFF' }} onClick={handleSignUpClick}>Signup</Button>
            </Container>
            <Container>
                <Typography variant="h4" style={{ fontFamily: 'Cursive' }}>Already have an account?</Typography>
                <Button variant="contained" style={{ backgroundColor: '#8A2BE2', color: '#FFF' }}   onClick={handleLoginClick}>Login</Button>
            </Container>
        </Container>
        </Box>
       
    );
};
export default Dashboard;

