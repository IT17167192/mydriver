import React, {useEffect, useState} from "react";
import Grid from '@material-ui/core/Grid';
import * as Constants from '../../Constants';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import {makeStyles} from "@material-ui/core/styles";
import PageHeader from "../Common/page-header-component";
import BreadcrumbComponent from "../Common/breadcrumb-component";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPaperPlane, faRedoAlt, faCloudUploadAlt, faUpload} from "@fortawesome/free-solid-svg-icons";
import CircularProgress from "@material-ui/core/CircularProgress";
import {isAuthenticate} from "../Auth/auth-service";
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import {uploadFile} from "./upload-service";
import { Progress } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import swal from "sweetalert";

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

const Upload = (props) => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const {token, tokenObj} = isAuthenticate();
    const [loader, setLoader] = useState(false);
    const [progress, setProgress] = useState(0);

    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = (files, allFiles) => {
        let err = 0;
        let uploadedCount = 0;
        const totalFiles = files.length;
        setLoader(true);

        let keysPromise = files.map(f =>
            new Promise((resolve, reject) =>{
                console.log(f);
                const data = new FormData();
                data.append('file', f.file);
                data.append('id_token', tokenObj.id_token);
                uploadFile(token, data)
                    .then(data => {
                        if(!data.success){
                            err++;
                            reject();
                            return true;
                        }else{
                            ++uploadedCount;
                            console.log(uploadedCount);
                            console.log(totalFiles);
                            console.log((uploadedCount/totalFiles)*100);
                            console.log(Math.floor((uploadedCount/totalFiles)*100));
                            setProgress(Math.floor((uploadedCount/totalFiles) * 100));
                            console.log(data);
                            resolve();
                        }
                    })
                    .catch(err => console.log(err));
            })
        );

        Promise.all(keysPromise).then(() => {
           swal("Successful!", "Files Uploaded Successfully!", "success");
            allFiles.forEach(f => f.remove())
           setLoader(false);
        });

    };

    const progressBar = () => {
        return (
            <div className="row mt-3 mb-5" style={{display: loader ? '' : 'none'}}>
                <div className="col-12">
                    <Progress percent={progress} active success/>
                </div>
            </div>
        );
    };

    return (
        <Grid item xs={12} md={12} lg={12}>
            <div className="row">
                <div className="col-md-12">
                    <PageHeader title="Upload New File">
                        <FontAwesomeIcon size={"2x"} icon={faUpload}/>
                    </PageHeader>
                </div>
            </div>
            <BreadcrumbComponent pathname={props.pathname}/>
            <Paper className={fixedHeightPaper + " mb-5"}>
                <div className="col-12">
                    <div className="row">
                        <div className="col-md-12 text-center mb-3 mt-5" style={{fontSize: '20px', color: '#8C8887'}}>
                            <FontAwesomeIcon size={"1x"} icon={faCloudUploadAlt}/> {' '} Add File
                        </div>
                    </div>
                    <div className="row mt-3 p-4">
                        <Dropzone
                            onSubmit={handleSubmit}
                        />
                    </div>
                    {progressBar()}
                    <br/>
                </div>

            </Paper>
        </Grid>
    );


};

export default Upload;
