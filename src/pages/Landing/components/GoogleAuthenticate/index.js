import React, { createRef, useCallback } from "react";
import { GoogleLogin } from "react-google-login";

const responseGoogle = async (googleUser) => {
    const data = {
        type: "google",
        token: googleUser.getAuthResponse().id_token,
    };
    const url = "http://localhost:3000/login";
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",
        cache: "no-cache",
        redirect: "follow",
        body: JSON.stringify(data),
    });
    console.log(await res.json());
};
function GoogleLoginForm() {
    return (
        <GoogleLogin
            clientId="544783505726-01oarpi4q6rshp7d4jcbshkvmb7qcj7a.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
        />
    );
}

export { GoogleLoginForm };
