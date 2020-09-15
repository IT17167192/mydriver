import React from "react";
import * as Constants from '../../Constants';
import Upload from "../Uploader/add-uploads-component";

const appendView = (history) => {
    console.log(history.location.pathname);
    console.log(Constants.ROUTES.uploader);
    if(history.location.pathname === Constants.ROUTES.uploader){
        return (
            <Upload pathname = {history.location.pathname} />
        );
    }else{
        return (
          "Hello"
        );
    }
};

const Layout = (props) => {
    return (
        appendView(props.history)
    );
};

export default Layout;

