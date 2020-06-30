import React from "react";
import { GoogleLogin } from "react-google-login";
import { GoogleOAuth2Data } from "oauth2";

function GoogleAuthenticateButton(props) {
    return (
        <GoogleLogin
            clientId={GoogleOAuth2Data.clientId}
            buttonText={props.text}
            onSuccess={props.onSuccessHandler}
            cookiePolicy={"single_host_origin"}
        />
    );
}

export { GoogleAuthenticateButton };
