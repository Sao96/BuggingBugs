import React from "react";
import { SuccessBox, ErrorBox } from "responseBoxes";

function ResRender(props) {
    const res = props.res;

    const pid = props.pid;
    switch (res[1]) {
        case -1: //set loading
            return <> </>;
        case 200:
            return <SuccessBox text={res[0].message} />;
        case 300:
            return <Redirect push to={"/login"} />;
        case 400:
            return <ErrorBox text={res[0]} />;
        default:
            return <ErrorBox text={"An internal error has occured."} />;
    }
}

export { ResRender };
