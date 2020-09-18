import React from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import {makeStyles} from "@material-ui/core/styles";
import PageHeader from "../Common/page-header-component";
import BreadcrumbComponent from "../Common/breadcrumb-component";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTachometerAlt} from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        display: 'flex',
    },
    fixedHeight: {
        height: '100%',
    },
    marginBottom: "mb-5"
}));

const DashboardComponent = (props) => {
    //style config
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <Grid item xs={12} md={12} lg={12}>
            <div className="row">
                <div className="col-md-12">
                    <PageHeader title="Dashboard">
                        <FontAwesomeIcon size={"2x"} icon={faTachometerAlt}/>
                    </PageHeader>
                </div>
            </div>
            <BreadcrumbComponent pathname={props.pathname}/>
            <Paper className={fixedHeightPaper + " mb-5"}>
                <div className="col-12">
                    <div className="row">
                        <div className="col-md-12 text-center mb-3 mt-5" style={{fontSize: '20px', color: '#8C8887'}}>
                             Dashboard
                        </div>
                    </div>
                    <div className="row mt-3">

                    </div>
                    <br/>
                </div>

            </Paper>
        </Grid>
    );


};

export default DashboardComponent;
