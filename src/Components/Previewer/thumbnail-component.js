import React, {useEffect, useState} from "react";
import {isAuthenticate} from "../Auth/auth-service";
import {getFileThumbnailUrl} from "./preview-service";
import CircularProgress from "@material-ui/core/CircularProgress";
import defaultDocument from "../../assets/images/default_document.jpg"

const ThumbnailComponent = (props) => {
    const [fileId, setFileId] = useState('');
    const {token, tokenObj} = isAuthenticate();
    const [thumbnailSrc, setThumnailSrc] = useState("");

    const getFileThumbnail = () => {
        getFileThumbnailUrl(token, {"id_token": tokenObj.id_token, fileId})
            .then(data => {
                if(data.err){
                    console.log(data.err);
                }else{
                    setThumnailSrc(data.data);
                }
            })
            .catch(err=>console.log(err));
    };

    useEffect(() => {
        setFileId(props.fileId);
        if(fileId !== ''){
            getFileThumbnail();
        }
    }, [fileId]);

    return (
        <div className="text-center">
            {
                thumbnailSrc ===  "" ?
                    <div id={fileId} className="col-12 ml-5 card shadow-lg bg-white" style={{"width": "60px", "height": "80px"}}>
                        <div className="text-center mt-4">
                            <CircularProgress size={20}/>
                        </div>
                    </div>
                    : <a id={fileId} target="_blank" href={thumbnailSrc ? thumbnailSrc : defaultDocument}>
                        <img src={thumbnailSrc ? thumbnailSrc: defaultDocument} alt="document_image" style={{"width": "60px", "height": "80px"}} className="img-thumbnail"/>
                      </a>
            }
        </div>
    );
};

export default ThumbnailComponent;
