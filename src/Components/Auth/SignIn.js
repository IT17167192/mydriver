import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {Redirect} from "react-router-dom";
import {authenticate, isAuthenticate, signIn} from "./auth-service";
import cover from '../../assets/images/cover2.jpg';
import googleDriveLogp from '../../assets/images/google_drive_logo.png'
import * as Constants from '../../Constants';
import logo from "../../assets/images/google_drive_logo.png";
import GoogleLogin from "react-google-login";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                My Driver
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

//custom styling
const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url(${cover})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignIn = () => {
    const classes = useStyles();
    //redirect handlers
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {

    }, []);

    const redirectUser = () => {
        if (redirect) {
            return <Redirect to={Constants.ROUTES.dashboard}/>
        }

        //if the user already logged in
        if (isAuthenticate()) {
            return <Redirect to={Constants.ROUTES.dashboard}/>
        }
    };

    const responseGoogle = (response) => {
        // console.log(response);
        if(response.profileObj.email){
            const tokenObj = {
                access_token: response.tokenObj.access_token,
                refresh_token: "",
                scope: response.tokenObj.scope,
                token_type: "Bearer",
                id_token: response.tokenObj.id_token,
                expiry_date:response.tokenObj.expires_at
            };

            signIn({name: response.profileObj.name , provider: "Google" , email: response.profileObj.email , providerId: response.googleId , token: response.accessToken, profilePicture: response.profileObj.imageUrl, tokenObj: tokenObj})
                .then(data => {
                    if (data.error) {
                        console.log("Error");
                    } else {
                        // const data = {name: response.profileObj.name , provider: "Google" , email: response.profileObj.email , providerId: response.googleId , token: response.accessToken, profilePicture: response.profileObj.imageUrl, tokenObj: tokenObj};
                        authenticate({name: response.profileObj.name , provider: "Google" , email: response.profileObj.email , providerId: response.googleId , token: response.accessToken, profilePicture: response.profileObj.imageUrl, tokenObj: tokenObj}, () => {
                                setRedirect(true);
                            }
                        );
                    }
                })
        }
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>
            <Grid className="p-5" item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar} style={{backgroundColor: Constants.LINK.active}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <br/>
                    <GoogleLogin clientId="630604470131-nbeb6lhj7n53o1vu6o1hr9lu0d7phn2a.apps.googleusercontent.com"
                                 buttonText="Google Login"
                                 approvalPrompt="force"
                                 prompt='consent'
                                 scope={Constants.SCOPE}
                                 onSuccess={responseGoogle}
                                 onFailure={responseGoogle} />
                    <img src={logo} width="50%" height="10%"/>
                </div>
                <Box mt={3}>
                    <Copyright/>
                </Box>
            </Grid>
            {redirectUser()}
        </Grid>
    );
}

export default SignIn;
