import React, { createRef, useCallback, useState, useEffect } from "react";
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
    setRes,
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
    const resStatus = res.status,
        resData = await res.json();
    setRes([resData, resStatus]);
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
    const clickHandler = useCallback((googleUser) => {
        googleLoginHandler(
            googleUser,
            props.endpoint,
            setProcessing,
            props.setRes
        );
    }, []);
    const layoutStyle = {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
    };

    return (
        <div style={layoutStyle}>
            <GoogleButton
                buttonText={props.text}
                processing={processing}
                handler={clickHandler}
            />
        </div>
    );
}

export { GoogleLoginForm };
