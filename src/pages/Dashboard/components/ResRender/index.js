import React from "react";
import { ErrorBox } from "responseBoxes";
import { navRoutes } from "navRoutes";

function ResRender(props) {
    const res = props.res;
    switch (res[1]) {
        case -1:
        case 200:
            return <></>;
        case 300:
            return <Redirect push to={navRoutes.login} />;
        default:
            const errorText =
                res[0] !== "" ? res[0] : "An unknown error has occured.";
            return <ErrorBox text={errorText} />;
    }
}

export { ResRender };
