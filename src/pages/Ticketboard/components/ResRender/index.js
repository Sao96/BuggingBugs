import React from "react";
import { Redirect } from "react-router-dom";
import { navRoutes } from "navRoutes";

function ResRender(props) {
    const res = props.res;
    switch (res[0]) {
        case -1:
        case 200:
            return <></>;
        case 300:
            return <Redirect push to={navRoutes.login} />;
        default:
            return <Redirect push to={navRoutes.dashboard} />;
    }
}

export { ResRender };
