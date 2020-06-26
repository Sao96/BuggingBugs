import React, { createRef, useCallback, useState } from "react";
import { Redirect } from "react-router";
import Button from "util/Button.jsx";
import { GoogleLoginForm } from "util/Authentication/GoogleAuthenticate";
import { domain } from "routes";
import { useDispatch } from "react-redux";
import { ErrorBox } from "util/ErrorBox";
import { sharedActions } from "actions/sharedactions";
import { InputFields } from "util/Authentication/FormComponents/InputFields";
import { SubmitButton } from "util/Authentication/FormComponents/SubmitButton";
import { Logo } from "util/Authentication/FormComponents/Logo";

const PushRegister = async (regInfoRefs) => {
    const data = { type: "native" };
    for (let field in regInfoRefs) {
        if (regInfoRefs[field].current) {
            data[field] = regInfoRefs[field].current.value;
        }
    }
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const endpoint = domain + "register";
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

const ResRender = (props) => {
    const res = props.res;
    const dispatch = props.dispatch;
    const setError = props.setError;
    switch (res[1]) {
        case -1:
            return <></>;
        case 200:
            dispatch({
                type: sharedActions.SET_LOGGED_IN,
                loggedIn: true,
            });
            return <Redirect push to={"/dashboard"} />;
        default:
            return <ErrorBox text={res[0]} />;
    }
};

const Register = (props) => {
    const [res, setRes] = useState(["", -1]);
    const [goToLogin, setGoToLogin] = useState(false);
    const dispatch = useDispatch();
    const fieldRefs = {
        email: createRef(),
        firstName: createRef(),
        lastName: createRef(),
        password: createRef(),
        repassword: createRef(),
    };
    const registerClickHandler = useCallback(() => {
        PushRegister(fieldRefs);
    }, [fieldRefs]);
    const loginClickHandler = useCallback(() => {
        setGoToLogin(true);
    }, [goToLogin]);

    if (goToLogin) {
        return <Redirect push to={"/login"} />;
    }

    const inputFields = [
        ["Email", "text", fieldRefs.email],
        ["First Name", "text", fieldRefs.firstName],
        ["Last Name", "text", fieldRefs.lastName],
        ["Password (8 or more characters)", "text", fieldRefs.password],
        ["Enter Password Again", "text", fieldRefs.repassword],
    ];

    const registerTextStyle = {
        fontSize: "30px",
        paddingBottom: "20px",
        fontFamily: "Montserrat",
    };
    const pageStyle = {
        display: "absolute",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };
    const mainStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "500px",
        height: "800px",
        background: "rgb(67, 118, 148)",
        border: "rgb(37, 88, 118) 0.5px solid",
    };

    return (
        <article style={pageStyle}>
            <main style={mainStyle}>
                <ResRender res={res} dispatch={dispatch} />
                <section>
                    <Logo />
                </section>
                <section>
                    <header style={registerTextStyle}>Sign Up</header>
                </section>
                <section>
                    <GoogleLoginForm
                        dispatch={props.dispatch}
                        text={"Sign Up"}
                        endpoint={"/api/register"}
                        setRes={setRes}
                    />
                </section>
                <section>
                    <InputFields data={inputFields} />
                </section>
                <section style={{ display: "flex" }}>
                    <SubmitButton text={"Login"} handler={loginClickHandler} />
                    <Button
                        text={"Register"}
                        backgroundColor={"green"}
                        onClick={registerClickHandler}
                    />
                </section>
            </main>
        </article>
    );
};

export { Register };
