import React, { createRef, useCallback } from "react";
import Button from "util/Button.jsx";
import { RegisterForm } from "./components/RegisterForm";
import { LoginForm } from "./components/LoginForm";
import { useSelector } from "react-redux";
import { sharedFields } from "fields/sharedfields";
import { Redirect } from "react-router-dom";

function Landing(props) {
    const alreadyLogged = useSelector((state) => {
        return state.shared[sharedFields.LOGGED_IN];
    });
    if (alreadyLogged) {
        return <Redirect to={"/dashboard"} />;
    }
    return (
        <div>
            <LoginForm />
            <div style={{ paddingBottom: "300px" }}></div>
            <RegisterForm />
        </div>
    );
}

export { Landing };
