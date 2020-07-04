import React from "react";
import { Redirect } from "react-router-dom";
import { ErrorBox } from "responseBoxes";
import { navRoutes } from "navRoutes";
import { SpinningLoader } from "util/components/loading";
import { sharedActions as sA } from "actions/sharedactions";

function ResRender(props) {
    const res = props.res;
    const resText = res[1].message;
    const dispatch = props.dispatch;
    if (props.processing) {
        return <SpinningLoader loading={true} />;
    }
    switch (res[0]) {
        case -1:
            return <></>;
        case 200:
            dispatch({
                type: sA.EMPTY_MODAL_STACK,
            });
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
            const errorText =
                resText !== "" ? resText : "An unknown error has occured.";
            return <ErrorBox text={errorText} />;
    }
}

export { ResRender };
