import React from "react";
import { SuccessBox, ErrorBox } from "responseBoxes";
import { Redirect } from "react-router-dom";
import { navRoutes } from "navRoutes";

function ResRender(props) {
    const res = props.res;
    const resMsg = res[1].message;
    switch (res[0]) {
        case -1: //set loading
            return <> </>;
        case 200:
            return <SuccessBox text={resMsg} />;
        case 300:
            return <Redirect push to={navRoutes.login} />;
        default:
            const errorText =
                resMsg !== "" ? resMsg : "An unknown error has occured";
            return <ErrorBox text={errorText} />;
    }
}

export { ResRender };
