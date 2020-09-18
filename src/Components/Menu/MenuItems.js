import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AttachmentIcon from '@material-ui/icons/Attachment';
import {Link, withRouter} from "react-router-dom";
import Collapse from '@material-ui/core/Collapse';
import List from "@material-ui/core/List";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {makeStyles} from '@material-ui/core/styles';
import AddBoxIcon from '@material-ui/icons/AddBox';
import * as Constants from '../../Constants';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(3),
    },
}));

const MenuItems = ({history}) => {
    const classes = useStyles();

    const isActive = (history, path) => {
        if (history.location.pathname === path) {
            return Constants.LINK.active;
        } else {
            return '#ffffff';
        }
    };

    const isIncludes = (history, path) => {
        if (history.location.pathname.includes(path)) {
            return true;
        } else {
            return false;
        }
    };

    const isSelected = (history, path) => {
        if (history.location.pathname === path) {
            return true;
        } else {
            return false;
        }
    };

    const [openCollapseMyDriver, setOpenCollapseMyDriver] = React.useState(false);

    const handleOpenSettings = (location) => {
        if (location === 'mydriver') {
            setOpenCollapseMyDriver(!openCollapseMyDriver);
        }
    };

    return (
        <div>
            <Link to="/dashboard" style={{textDecoration: 'none', color: isActive(history, '/dashboard')}}>
                <ListItem button selected={isSelected(history, '/dashboard')}>
                    <ListItemIcon style={{color: isActive(history, '/dashboard')}}>
                        <DashboardIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" style={{color: isActive(history, '/dashboard')}}/>
                </ListItem>
            </Link>
            <ListItem button onClick={() => handleOpenSettings('mydriver')}
                      style={isIncludes(history, Constants.ROUTES.uploader.split('/')[1]) ? {color: Constants.LINK.active} : {color: '#ffffff'}}
                      selected={isIncludes(history, Constants.ROUTES.uploader.split('/')[1])}>
                <ListItemIcon
                    style={isIncludes(history, Constants.ROUTES.uploader.split('/')[1]) ? {color: Constants.LINK.active} : {color: '#ffffff'}}>
                    <AttachmentIcon/>
                </ListItemIcon>
                <ListItemText primary="Upload Management"/>
                {openCollapseMyDriver ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Collapse in={openCollapseMyDriver} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <Link to={Constants.ROUTES.uploader} style={{textDecoration: 'none', color: isActive(history, Constants.ROUTES.uploader)}}>
                        <ListItem button className={classes.nested} selected={isSelected(history, Constants.ROUTES.uploader)}>
                            <ListItemIcon style={{color: isActive(history, Constants.ROUTES.uploader)}}>
                                <AddBoxIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Upload Files"/>
                        </ListItem>
                    </Link>
                </List>
                <List component="div" disablePadding>
                    <Link to={Constants.ROUTES.previewer} style={{textDecoration: 'none', color: isActive(history, Constants.ROUTES.previewer)}}>
                        <ListItem button className={classes.nested} selected={isSelected(history, Constants.ROUTES.previewer)}>
                            <ListItemIcon style={{color: isActive(history, Constants.ROUTES.previewer)}}>
                                <AddBoxIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Preview Files"/>
                        </ListItem>
                    </Link>
                </List>
            </Collapse>
        </div>
    )
};

export default withRouter(MenuItems);
