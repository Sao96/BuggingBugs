import React, { createRef, useCallback, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useHistory, Redirect } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { ErrorBox } from "util/ErrorBox";
import { useSelector, useDispatch } from "react-redux";
import { sharedFields } from "fields/sharedfields";
import { sharedActions } from "actions/sharedactions";
const googleLoginHandler = async (
    googleUser,
    endpoint,
    setProcessing,
    setError,
    dispatch
) => {
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
    switch (res.status) {
        case 200:
            dispatch({
                type: sharedActions.SET_LOGGED_IN,
                loggedIn: true,
            });
            break;
        case 400:
            setError([400, await res.text()]);
            break;
        default:
            setError([500, "An unknown error has occured."]);
    }
};

const redirectLogged = (alreadyLogged) => {
    const loggedIn = alreadyLogged;

    return loggedIn ? <Redirect to={"/dashboard"} /> : <div></div>;
};

const errorDisplay = (statusCode, statusMessage) => {
    return statusCode === 400 || statusCode === 500 ? (
        <ErrorBox text={statusMessage} />
    ) : (
        <></>
    );
};

const buttonDisplay = (buttonText, processing, handler) => {
    let buttonDisplay;
    if (processing) {
        buttonDisplay = (
            <ClipLoader
                size={150}
                color={"rgb(200,200,200)"}
                loading={processing}
            />
        );
    } else {
        buttonDisplay = (
            <GoogleLogin
                clientId="544783505726-01oarpi4q6rshp7d4jcbshkvmb7qcj7a.apps.googleusercontent.com"
                buttonText={buttonText}
                onSuccess={handler}
                cookiePolicy={"single_host_origin"}
            />
        );
    }

    return buttonDisplay;
};

function GoogleLoginForm(props) {
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState([-1, ""]);
    const alreadyLogged = useSelector((state) => {
        return state.shared[sharedFields.LOGGED_IN];
    });
    const dispatch = useDispatch();
    const clickHandler = useCallback(
        (googleUser) => {
            googleLoginHandler(
                googleUser,
                props.endpoint,
                setProcessing,
                setError,
                dispatch
            );
        },
        [props.endpoint, setProcessing, setError, dispatch]
    );

    const layoutStyle = {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
    };

    return (
        <div style={layoutStyle}>
            {errorDisplay(error[0], error[1])}
            {buttonDisplay(props.text, processing, clickHandler)}
            {redirectLogged(alreadyLogged)}
        </div>
    );
}

export { GoogleLoginForm };
