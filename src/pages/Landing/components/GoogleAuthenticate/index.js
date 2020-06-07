import React, { createRef, useCallback } from "react";
import { GoogleLogin } from "react-google-login";

const googleLoginHandler = async (googleUser, endpoint) => {
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
};

function GoogleLoginForm(props) {
    const clickHandler = useCallback(
        (googleUser) => {
            googleLoginHandler(googleUser, props.endpoint);
        },
        [props.endpoint]
    );
    return (
        <GoogleLogin
            clientId="544783505726-01oarpi4q6rshp7d4jcbshkvmb7qcj7a.apps.googleusercontent.com"
            buttonText={props.text}
            onSuccess={clickHandler}
            onFailure={clickHandler}
            cookiePolicy={"single_host_origin"}
        />
    );
}

export { GoogleLoginForm };
