import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";

const BreadcrumbComponent = (props) => {
    const breadcrumb = (pathname) => {
        const splitArray = pathname.split('/');
        let breadCrumbArray = [];
        // <Breadcrumb.Item active>Data</Breadcrumb.Item>
        splitArray.forEach((item, i) => {
            if (i !== 0) {
                if ((splitArray.length - 1) === i) {
                    breadCrumbArray.push(<Breadcrumb.Item key={i} active>{item}</Breadcrumb.Item>)
                } else {
                    breadCrumbArray.push(<Breadcrumb.Item key={i}>{item}</Breadcrumb.Item>);
                }
            }
        })
        return (
            <Breadcrumb className="mb-3 mt-1">
                {breadCrumbArray}
            </Breadcrumb>
        );
    };
    return (
        breadcrumb(props.pathname)
    );
};

export default BreadcrumbComponent;
