import React from "react";
import { Redirect } from "react-router-dom";
import { sharedActions as sA } from "actions/sharedactions";
import { ErrorBox } from "util/components/responseBoxes";
import { navRoutes } from "navRoutes";

function ResRender(props) {
    const res = props.res;
    const resMsg = res[1].message;
    const dispatch = props.dispatch;
    switch (res[0]) {
        case -1:
            return <></>;
        case 200:
            dispatch({
                type: sA.SET_LOGGED_IN,
                loggedIn: true,
            });
            dispatch({
                type: sA.SET_USER_DATA,
                userData: {
                    uid: res[1].uid,
                    name: res[1].name,
                    email: res[1].email,
                    pfp: res[1].pfp,
                },
            });
            return <Redirect push to={navRoutes.dashboard} />;
        default:
            const errText =
                resMsg !== "" ? resMsg : "An unknown error has occured.";
            return <ErrorBox text={errText} />;
    }
}

export { ResRender };
