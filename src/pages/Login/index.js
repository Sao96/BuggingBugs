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

const PushLogin = async (regInfoRefs) => {
    const data = {};
    for (let field in regInfoRefs) {
        if (regInfoRefs[field].current) {
            data[field] = regInfoRefs[field].current.value;
        }
    }
    const endpoint = domain + "login";
    const res = await fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
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

const Login = (props) => {
    const [res, setRes] = useState(["", -1]);
    const [goToRegister, setGoToReigster] = useState(false);
    const loginClickHandler = useCallback(() => {
        PushLogin(props.fieldRefs);
    }, [fieldRefs]);
    const registerClickHandler = useCallback(() => {
        setGoToReigster(true);
    }, [setGoToReigster]);

    if (goToRegister) {
        return <Redirect push to={"/register"} />;
    }

    const dispatch = useDispatch();
    const fieldRefs = {
        username: createRef(),
        password: createRef(),
    };
    const inputFields = [
        ["Email", "text", fieldRefs.username],
        ["Password", "password", fieldRefs.password],
    ];

    const loginTextStyle = {
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
        height: "500px",
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
                    <header style={loginTextStyle}>Sign In</header>
                </section>
                <section>
                    <GoogleLoginForm
                        dispatch={props.dispatch}
                        text={"Sign In"}
                        endpoint={"/api/login"}
                        setRes={setRes}
                    />
                </section>
                <section>
                    <InputFields data={inputFields} />
                </section>
                <section style={{ display: "flex" }}>
                    <SubmitButton
                        text={"Register"}
                        handler={registerClickHandler}
                    />
                    <Button
                        text={"Login"}
                        backgroundColor={"green"}
                        onClick={loginClickHandler}
                    />
                </section>
            </main>
        </article>
    );
};

export { Login };