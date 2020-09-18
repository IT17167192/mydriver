import React, {useEffect, useState} from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import {makeStyles} from "@material-ui/core/styles";
import PageHeader from "../Common/page-header-component";
import BreadcrumbComponent from "../Common/breadcrumb-component";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFilePdf, faTrashAlt, faDownload} from "@fortawesome/free-solid-svg-icons";
import {isAuthenticate} from "../Auth/auth-service";
import {deleteFile, downloadFile, readFiles, readNextSetOfFiles} from "./preview-service";
import { useAlert } from 'react-alert'
import IconButton from '@material-ui/core/IconButton';
import swal from "sweetalert";
import * as Constants from '../../Constants';
import ThumbnailComponent from "./thumbnail-component";

//library to upload files
const fileDownload = require('js-file-download');

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

const PreviewFiles = (props) => {
    //style config
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const alert = useAlert();

    const {token, tokenObj} = isAuthenticate();
    //get all documents from backend
    const [documents, setAllDocuments] = useState([]);
    const [nextPageToken, setNextPageToken] = useState("");
    const [path, setPath] = useState(["1"]);

    const fetchFiles = () => {
        readFiles(token, {"id_token": tokenObj.id_token})
            .then(data => {
                if(data.err) {
                    alert.error(`Error: ${data.err}`);
                }else{
                    if(data.status){
                        alert.show(`${data.status}`);
                    }

                    if(path.length >= 1 && data.nextPageToken !== ""){
                        setNextPageToken(data.nextPageToken);
                    }
                    setAllDocuments(data.files);
                }
            })
            .catch(err => console.log(err));
    };

    const nextSetOfFiles = (event) => {
        event.preventDefault();
        setPath([...path, nextPageToken]);
        //(nextPageToken);
        readNextSetOfFiles(token, {"id_token": tokenObj.id_token, "nextPageToken": nextPageToken})
            .then(data => {
                if(data.err) {
                    alert.error(`Error: ${data.err}`);
                }else{
                    if(data.status){
                        alert.show(`${data.status}`);
                    }

                    if(typeof data.nextPageToken !== "undefined"){
                        setNextPageToken(data.nextPageToken);
                    }else{
                        //("nextPageToken to empty")
                        setNextPageToken("" );
                    }
                    setAllDocuments(data.files);
                }
            })
            .catch(err => console.log(err));
    };

    const paginateBackward = (event) => {
        event.preventDefault();
        const tokenToDelete = path[(path.length - 1)];
        setNextPageToken(tokenToDelete);
        const newPath = path.filter(p => p !== tokenToDelete);
        setPath([...newPath]);
        if((newPath.length - 1) > 0){
            readNextSetOfFiles(token, {"id_token": tokenObj.id_token, "nextPageToken": newPath[(newPath.length - 1)]})
                .then(data => {
                    if(data.err) {
                        alert.error(`Error: ${data.err}`);
                    }else{
                        if(data.status){
                            alert.show(`${data.status}`);
                        }

                        setAllDocuments(data.files);
                    }
                })
                .catch(err => console.log(err));
        }else{
            fetchFiles();
        }
    };

    useEffect(() => {
        fetchFiles();
    }, [])

    const paginate = () => {
        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item"  style={{display: path.length > 1 ? '' : 'none'}}>
                        <div className="page-link" onClick={paginateBackward} style={{"backgroundColor": Constants.LINK.active, "color": Constants.LINK.inactive, "cursor": "pointer"}} aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </div>
                    </li>

                    <li className="page-item" style={{display: nextPageToken !== "" ? '' : 'none'}}>
                        <div className="page-link" onClick={nextSetOfFiles} style={{"backgroundColor": Constants.LINK.active, "color": Constants.LINK.inactive, "cursor": "pointer"}} aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </div>
                    </li>
                </ul>
            </nav>
        );
    };

    const handleOnClickDownload = (file) => {
        downloadFile(token, {fileName: file.name, "id_token": tokenObj.id_token})
            .then(data => {
                if(data.err){
                    alert.error(`Error: ${data.err}`);
                }else{
                    fileDownload(data, file.name);
                }
                //(data);
            })
            .catch(err => console.log(err));
    };

    const handleOnClickDelete = (file) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    deleteFile(token, {"id_token": tokenObj.id_token, "fileName": file.name}, file.id)
                        .then(data => {
                            if(data.err){
                                alert.error(`Error: ${data.err}`);
                            }else{
                                swal("File Successfully Deleted!", {
                                    icon: "success",
                                });
                                setAllDocuments([]);
                                setPath(["1"]);
                                fetchFiles();
                            }
                            //(data);
                        })
                        .catch(err => console.log(err));
                } else {
                    swal("Request Cancelled!");
                }
            });
    };

    const filesTable = () => (
        <div className="col-12 card shadow-lg mb-5 bg-white">
            <table className="table table-hover mt-3 table-striped  table-responsive-lg ">
                <thead style={{"backgroundColor": Constants.LINK.active, "color": Constants.LINK.inactive}}>
                <tr>
                    <th scope="col">Preview</th>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody className="table-striped">
                    { typeof documents != "undefined" && documents.length > 0 ? documents.map((file) => (
                        <tr key={file.id}>
                            <td className="text-left"><ThumbnailComponent fileId={file.id} /></td>
                            <td className="text-left">{file.name}</td>
                            <td className="center">
                                <IconButton onClick={() => {
                                    handleOnClickDownload({id: file.id, name: file.name})
                                }}>
                                    <FontAwesomeIcon size={"1x"} style={{"color": Constants.DOWNLOAD_BTN_COLOR}} icon={faDownload}/>
                                </IconButton>
                                {' | '}
                                <IconButton onClick={() => {
                                    handleOnClickDelete({id: file.id, name: file.name})
                                }}>
                                    <FontAwesomeIcon size={"1x"} style={{"color": Constants.DELETE_BTN_COLOR}} icon={faTrashAlt}/>
                                </IconButton>
                            </td>
                        </tr>
                    )) : <tr><td colSpan="3" className="text-center">No data Found!</td></tr> }
                </tbody>
            </table>
        </div>
    );

    return (
        <Grid item xs={12} md={12} lg={12}>
            <div className="row">
                <div className="col-md-12">
                    <PageHeader title="Preview Files">
                        <FontAwesomeIcon size={"2x"} icon={faFilePdf}/>
                    </PageHeader>
                </div>
            </div>
            <BreadcrumbComponent pathname={props.pathname}/>
            <Paper className={fixedHeightPaper + " mb-5"}>
                <div className="col-12">
                    <div className="row">
                        <div className="col-md-12 text-center mb-3 mt-5" style={{fontSize: '20px', color: '#8C8887'}}>
                             All Files
                        </div>
                    </div>
                    <div className="row mt-3">
                        {filesTable()}
                    </div>
                    <br/>
                    <div className="row mt-3">
                        <div className="col-12">
                            {paginate()}
                        </div>
                    </div>
                </div>

            </Paper>
        </Grid>
    );


};

export default PreviewFiles;
