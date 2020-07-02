import React, { createRef, useCallback, useState } from "react";
import { Redirect } from "react-router";
import { useDispatch } from "react-redux";
import { navRoutes } from "navRoutes";
import { DefaultButton, TextButton } from "util/components/buttons";
import { InputFields, Logo } from "util/components/authentication";
import { GoogleAuthenticateButton } from "util/components/authentication";
import { resolveRefValues } from "helperFunctions/refHelpers/resolveRefValues";
import { authenticationStyles as authStyles } from "styles";
import { ResRender } from "./components";
import { postRegister } from "apiCalls/BuggingBugs/POST";
import { SpinningLoader } from "util/components/loading";

function Register(props) {
    const dispatch = useDispatch();
    const [res, setRes] = useState([-1, ""]);
    const [processing, setProcessing] = useState(false);
    const [redirect, setRedirect] = useState("");
    const fieldRefs = {
        email: createRef(),
        firstName: createRef(),
        lastName: createRef(),
        password: createRef(),
        repassword: createRef(),
    };
    const inputFields = [
        ["Email", "text", fieldRefs.email],
        ["First Name", "text", fieldRefs.firstName],
        ["Last Name", "text", fieldRefs.lastName],
        ["Password (8 or more characters)", "text", fieldRefs.password],
        ["Enter password again", "text", fieldRefs.repassword],
    ];
    const registerClickHandler = useCallback(() => {
        postRegister(
            resolveRefValues(fieldRefs),
            "native",
            setRes,
            setProcessing
        );
    }, [fieldRefs, setRes, setProcessing]);
    const loginClickHandler = useCallback(() => {
        setRedirect(navRoutes.login);
    }, [setRedirect]);
    const googleOnSuccessHandler = useCallback(
        (googleUser) => {
            const registerType = "google";
            const reqData = {
                token: googleUser.getAuthResponse().id_token,
            };
            postRegister(reqData, registerType, setRes, setProcessing);
        },
        [setRes, setProcessing]
    );
    if (redirect !== "") {
        return <Redirect push to={redirect} />;
    }

    const headerText = "Sign Up";
    const containerStyle = {
        display: "absolute",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };
    const formDimensions = { height: "750px", paddingBottom: "50px" };
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
                <SpinningLoader loading={processing} />
                <section
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <GoogleAuthenticateButton
                        text={"Sign Up"}
                        onSuccessHandler={googleOnSuccessHandler}
                    />
                    <InputFields data={inputFields} />
                </section>
                <section style={{ display: "flex" }}>
                    <TextButton
                        text={"Login"}
                        onClick={!processing ? loginClickHandler : null}
                    />
                    <span style={{ paddingLeft: "40px" }} />
                    <DefaultButton
                        text={"Register"}
                        backgroundColor={"green"}
                        onClick={!processing ? registerClickHandler : null}
                    />
                </section>
            </main>
        </article>
    );
}

export { Register };
