import React from "react";
import { Redirect } from "react-router-dom";
import { ErrorBox } from "responseBoxes";

function ResRender(props) {
    const res = props.res;
    const resMsg = res[1].message;
    switch (res[0]) {
        case -1: //set loading
        case 200:
            return <></>;
        case 300:
            return <Redirect push to={"/login"} />;
        default:
            const errorText =
                resMsg !== "" ? resMsg : "An unknown error has occured";
            return <ErrorBox text={errorText} />;
    }
}

export { ResRender };
