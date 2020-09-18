import React from "react";
import * as Constants from '../../Constants';
import Upload from "../Uploader/add-uploads-component";
import DashboardComponent from "./dashboard-component";
import PreviewFiles from "../Previewer/preview-files-component";

const appendView = (history) => {
    if(history.location.pathname === Constants.ROUTES.uploader){
        return (
            <Upload pathname = {history.location.pathname} />
        );
    }else if(history.location.pathname === Constants.ROUTES.previewer){
        return (
          <PreviewFiles pathname = {history.location.pathname}/>
        );
    }else{
        return (
            <DashboardComponent pathname = {history.location.pathname}/>
        )
    }
};

const Layout = (props) => {
    return (
        appendView(props.history)
    );
};

export default Layout;

