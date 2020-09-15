import React from "react";
import * as Constants from '../../Constants';

const PageHeader = (props) => {
    return (
        <div className="card shadow-lg rounded">
            <div className="card-body" style={{backgroundColor: Constants.THEME.primary}}>
                <div className="row">
                    <div className="col-lg-auto col-md-12 col-sm-12 col-xs-12">
                        <div className="card" style={{backgroundColor: Constants.LINK.active, color: '#ffffff'}}>
                            <div className="card-body">
                                {props.children}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-auto col-md-12 col-sm-12 col-xs-12 mt-2">
                        <h1 style={{color: '#ffffff'}}>{props.title}</h1>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default PageHeader;
