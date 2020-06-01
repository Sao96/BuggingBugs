import React, { createRef, useCallback } from "react";
import Button from "util/Button.jsx";
import { RegisterForm } from "./components/RegisterForm";
import { LoginForm } from "./components/LoginForm";

function Landing(props) {
    return (
        // data-onsuccess="onSignIn"

        <div>
            <LoginForm />
            <div style={{ paddingBottom: "300px" }}></div>
            <RegisterForm />
        </div>
    );
}

export { Landing };
