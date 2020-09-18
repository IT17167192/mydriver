import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuItems from "../Menu/MenuItems";
import * as Constants from '../../Constants';
import Layout from "./Layout";
import logo from '../../assets/images/logo_drive.png'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Badge from '@material-ui/core/Badge/index';
import coverImage from '../../assets/images/mainDisplay2.jpg';
import {isAuthenticate, signout} from "../Auth/auth-service";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © IT17167192 '}
            <Link color="inherit" href="https://material-ui.com/">
               My Driver
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

//const drawerWidth = 310;
const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        backgroundColor : Constants.THEME.tertiary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(105% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
        marginLeft: 20,
    },
    drawerPaper: {
        overflow: "auto",
        height: "100%",
        [theme.breakpoints.up("md")]: {
            overflow: "auto",
            width: drawerWidth,
            position: "relative",
            height: "100%"
        },
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    headerColor : {
        //background: "#00a759"
        background: Constants.THEME.tertiary
    },
    color: {
        background: Constants.THEME.primary
    },
    fixedHeight: {
        height: 240,
    },
}));

const Dashboard = ({history}) => {
    const classes = useStyles();
    const {name, profilePicture} = isAuthenticate();
    const [open, setOpen] = React.useState(true);
    const {tokenObj} = isAuthenticate();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift, classes.headerColor )} style={{borderBottomLeftRadius : "30px"}}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon style={{color: Constants.THEME.secondary}} />
                    </IconButton>
                    <img src={logo} width="3.5%" height="3.5%"/>
                    <Typography component="h1"  variant="h6" color="white" noWrap className={classes.title} >
                        <span>  My Driver </span>
                    </Typography>
                    <span>{name} | </span>
                    <IconButton color="inherit"
                                onClick={() => signout({"id_token": tokenObj.id_token}, () => {
                                    history.push('/');
                                })}>
                        <Badge badgeContent={0} color="secondary">
                            <ExitToAppIcon/>
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"

                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose, classes.color),
                }}
                style={{boxShadow : "2px 2px 4px"}}
                open={open}
            >
                <div className={classes.toolbarIcon} style={{zIndex: "-5"}}>
                    <div className="container-fluid text-dark text-center">
                        <img src={profilePicture} className="imgProfile rounded-circle img-fluid cropImage border-light" width='60%' alt="Profile Picture"
                             style={{marginTop: 40, marginBottom: 40}}/>
                        {/*}<div className="centered text-secondary"><b>Admin</b></div> {*/}
                    </div>
                    <IconButton style={{color: Constants.THEME.secondary}} onClick={handleDrawerClose}>

                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List><MenuItems/></List>
            </Drawer>
            <main className={classes.content}
                style={{
                    backgroundImage: "url(" + coverImage + ")",
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',

                }}
            >
                <div className={classes.appBarSpacer} />
                <Container maxWidth="xl" className={classes.container}>
                    <Grid container spacing={3}>
                        <Layout history={history} />
                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
    );
}

export default Dashboard;
