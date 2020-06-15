import React, { createRef, useCallback, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useHistory, Redirect } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { ErrorBox } from "util/ErrorBox";
import { useSelector, useDispatch } from "react-redux";
import { sharedFields } from "fields/sharedfields";
import { sharedActions } from "actions/sharedactions";

const googleLoginHandler = async (googleUser, endpoint, setProcessing) => {
    setProcessing(true);
    const data = {
        type: "google",
        token: googleUser.getAuthResponse().id_token,
    };
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const res = await fetch(endpoint, {
        method: "POST",
        headers: headers,
        credentials: "include",
        mode: "cors",
        cache: "no-cache",
        redirect: "follow",
        body: JSON.stringify(data),
    });
    setProcessing(false);
    const resStatus = res.status,
        resData = await res.json();
    setRes([resData, resStatus]);
};

const ResRender = (props) => {
    const res = props.res;
    switch (res[1]) {
        case -1:
            return <></>;
        case 200:
            dispatch({
                type: sharedActions.SET_LOGGED_IN,
                loggedIn: true,
            });
            return <></>;
        default:
            dispatch({
                type: loginActions.SET_ERROR,
                error: res[0].length ? res[0] : "An unknown error has occured.",
            });
            return <></>;
    }
};

const GoogleButton = (props) => {
    const buttonText = props.buttonText;
    const processing = props.processing;
    const buttonClickHandler = props.handler;
    let buttonDisplay;
    if (processing) {
        buttonDisplay = (
            <ClipLoader
                size={50}
                color={"rgb(200,200,200)"}
                loading={processing}
            />
        );
    } else {
        buttonDisplay = (
            <GoogleLogin
                clientId="544783505726-01oarpi4q6rshp7d4jcbshkvmb7qcj7a.apps.googleusercontent.com"
                buttonText={buttonText}
                onSuccess={buttonClickHandler}
                cookiePolicy={"single_host_origin"}
            />
        );
    }

    return buttonDisplay;
};

function GoogleLoginForm(props) {
    const [processing, setProcessing] = useState(false);
    const [res, setRes] = useState(["", -1]);
    const dispatch = useDispatch();
    const clickHandler = useCallback(
        (googleUser) => {
            googleLoginHandler(
                googleUser,
                props.endpoint,
                setProcessing,
                setRes,
                dispatch
            );
        },
        [props.endpoint, setProcessing, setRes, dispatch]
    );
    const layoutStyle = {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
    };

    return (
        <div style={layoutStyle}>
            <ResRender res={res} />
            <GoogleButton
                buttonText={props.text}
                processing={processing}
                handler={clickHandler}
            />
        </div>
    );
}

export { GoogleLoginForm };
