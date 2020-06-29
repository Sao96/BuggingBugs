import React from "react";
import { ErrorBox } from "responseBoxes";

function ResRender(props) {
    const res = props.res;
    switch (res[0]) {
        case 300:
            return <Redirect to={"/login"} />;
        case 400:
            return <ErrorBox text={res[1]} />;
        case 500:
            return <ErrorBox text={res[1]} />;
        default:
            return <></>;
    }
}

export { ResRender };
