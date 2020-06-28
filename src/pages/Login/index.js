import React, { createRef, useCallback, useState } from "react";
import { Redirect } from "react-router";
import { useDispatch } from "react-redux";
import { navRoutes } from "navRoutes";
import { DefaultButton, TextButton } from "util/components/buttons";
import { InputFields, Logo } from "util/components/authentication";
import { ResRender } from "./components";
import { GoogleAuthenticateButton } from "util/components/authentication";
import { resolveRefValues } from "helperFunctions/refHelpers/resolveRefValues";
import { postLogin } from "apiCalls/BuggingBugs/POST";
import { authenticationStyles as authStyles } from "styles";

function Login(props) {
    const dispatch = useDispatch();
    const [res, setRes] = useState([-1, ""]);
    const [processing, setProcessing] = useState(false);
    const [redirect, setRedirect] = useState("");
    const fieldRefs = {
        email: createRef(),
        password: createRef(),
    };
    const inputFields = [
        ["Email", "text", fieldRefs.email],
        ["Password", "password", fieldRefs.password],
    ];
    const loginClickHandler = useCallback(() => {
        postLogin(resolveRefValues(fieldRefs), "native", setRes, setProcessing);
    }, [fieldRefs]);
    const registerClickHandler = useCallback(() => {
        setRedirect(navRoutes.register);
    }, [setRedirect]);
    const googleOnSuccessHandler = (googleUser) => {
        const loginType = "google";
        const reqData = {
            token: googleUser.getAuthResponse().id_token,
        };
        postLogin(reqData, loginType);
    };
    if (redirect !== "") {
        return <Redirect push to={redirect} />;
    }

    const headerText = "Sign In";
    const containerStyle = {
        display: "absolute",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };
    const formDimensions = { height: "500px", width: "500px" };
    const mainStyle = { ...authStyles.mainStyle, ...formDimensions };
    const headerStyle = authStyles.headerStyle;

    return (
        <article style={containerStyle}>
            <main style={mainStyle}>
                <header style={headerStyle}>
                    <Logo />
                    {headerText}
                </header>
                <ResRender res={res} dispatch={dispatch} />
                <section
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <GoogleAuthenticateButton
                        text={"Sign In"}
                        onSuccessHandler={googleOnSuccessHandler}
                    />
                    <InputFields data={inputFields} />
                </section>
                <section style={{ display: "flex" }}>
                    <TextButton
                        text={"Register"}
                        onClick={!processing ? registerClickHandler : null}
                    />
                    <span style={{ paddingLeft: "40px" }} />
                    <DefaultButton
                        text={"Login"}
                        backgroundColor={"green"}
                        onClick={!processing ? loginClickHandler : null}
                    />
                </section>
            </main>
        </article>
    );
}

export { Login };
