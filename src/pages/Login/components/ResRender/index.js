import React from "react";
import { sharedActions as sA } from "actions/sharedactions";
import { ErrorBox } from "util/components/responseBoxes";

function ResRender(props) {
    const res = props.res;
    const dispatch = props.dispatch;
    switch (res[0]) {
        case -1:
            return <></>;
        case 200:
            dispatch({
                type: sA.SET_LOGGED_IN,
                loggedIn: true,
            });
            return <Redirect push to={"/dashboard"} />;
        default:
            const errText =
                res[1] !== "" ? res[1] : "An unknown error has occured.";
            return <ErrorBox text={errText} />;
    }
}

export { ResRender };
