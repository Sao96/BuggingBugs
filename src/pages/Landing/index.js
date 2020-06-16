import React, { createRef, useCallback } from "react";
import Button from "util/Button.jsx";
import { RegisterForm } from "./components/RegisterForm";
import { LoginForm } from "./components/LoginForm";
import { useSelector, useDispatch } from "react-redux";
import { sharedFields } from "fields/sharedfields";
import { Redirect } from "react-router-dom";
import { sharedActions } from "actions/sharedactions";

function Landing(props) {
    return (
        <div>
            <LoginForm />
            <div style={{ paddingBottom: "300px" }}></div>
            <RegisterForm />
        </div>
    );
}

export { Landing };
