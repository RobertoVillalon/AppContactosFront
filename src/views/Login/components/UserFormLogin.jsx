import React from "react";
import { useDispatch, useSelector} from "react-redux";
//import { initSessionAction } from "../../../store/UserReducers";
import { getUserAction } from "../../../store/userSlice";
import {Link as LinkDom} from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { motion } from 'framer-motion'
import { Alert } from "@mui/material"


export default function LoginForm(){
    const dispatch = useDispatch();
    const theme = createTheme();
    const initSessionState = useSelector((state) => state.user.initSessionStatus)
    

  let handleAlert = () => {

      return(
          <motion.div style={{ display: 'absolute'}} initial={{scale: 0}} animate={{scale: 1}} transition={{ ease: "easeOut", duration: 1, type: "spring"}}>
             <Alert variant="outlined" severity="error">Error de credenciales </Alert> 
          </motion.div>
      )
  }

    function Copyright(props) {
        return (
          <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit">
              ContactAPP
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let usernameOrEmail = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        dispatch(getUserAction({usernameOrEmail, password}));

    };

    return (
        <ThemeProvider theme={theme}>
          <Grid id="loginMainGrid" container component="main">
            <CssBaseline />
            <Grid id="backgroundImgGrid" item sm={4} md={7} />
            <Grid id="formGrid" item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <Box id="avatarBox">
                <motion.div initial={{scale: 0}} animate={{scale: 1}} transition={{ ease: "easeOut", duration: 1 }}>
                  <Avatar id="loginAvatarFormBox">
                    <LockOutlinedIcon />
                  </Avatar>
                </motion.div>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box id="formComponentBox" component="form" noValidate onSubmit={handleSubmit}>
                  {initSessionState === 'rejected' && handleAlert()}
                  <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
                  <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
                  <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                  <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> Sign In </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link as={LinkDom} to="/" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link as={LinkDom} to="/register" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                  <Copyright id="copyrightFunction"/>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      );
}