import React from "react";
import { Redirect } from "react-router-dom";
import { SuccessBox, ErrorBox } from "responseBoxes";
import { navRoutes } from "navRoutes";

function ResRender(props) {
    const res = props.res;
    const resText = res[1].message;
    switch (res[0]) {
        case -1:
            return <></>;
        case 200:
            return <Redirect push to={navRoutes.dashboard} />;
        case 300:
            return <Redirect push to={navRoutes.login} />;
        default:
            const errorText =
                resText !== "" ? resText : "An unknown error has occured.";
            return <ErrorBox text={errorText} />;
    }
}

export { ResRender };
