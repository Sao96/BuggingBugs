import React from "react";
import { ErrorBox } from "responseBoxes";

function ResRender(props) {
    const res = props.res;
    switch (res[0]) {
        case -1:
            return <></>;
        case 400:
        case 500:
            return <ErrorBox text={res[0]} />;
        default:
            return <ErrorBox text={"An unknown error has occured."} />;
    }
}

export { ResRender };
