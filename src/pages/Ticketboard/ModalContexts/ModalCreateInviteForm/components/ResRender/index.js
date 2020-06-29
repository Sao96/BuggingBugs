import React from "react";
import { Redirect } from "react-router-dom";
import { ErrorBox } from "responseBoxes/ErrorBox";
import { SuccessBox } from "responseBoxes/SuccessBox";

function ResRender(props) {
    const res = props.res;
    const resText = res[1].message;

    switch (res[0]) {
        case -1:
            return <></>;
        case 200:
            return <SuccessBox text={resText} />;
        case 300:
            return <Redirect push to={"/login"} />;
        case 400:
        case 500:
        default:
            const errorText =
                resText !== "" ? resText : "An unknown error has occured.";
            return <ErrorBox text={errorText} />;
    }
}

export { ResRender };
