import React, { createRef, useCallback, useState } from "react";
import { Redirect } from "react-router";
import Button from "util/Button.jsx";
import { GoogleLoginForm } from "../GoogleAuthenticate";
import { domain } from "routes";
import { useDispatch } from "react-redux";
import { ErrorBox } from "util/ErrorBox";
import { sharedActions } from "actions/sharedactions";
const formItemStyle = {
    marginBottom: "25px",
    display: "flex",
    flexDirection: "column",
};
const labelStyle = {
    marginRight: "30px",
    marginBottom: "5px",
    fontFamily: "Didact Gothic",
    fontSize: "20px",
};

const inputFields = (fieldRefs) => {
    const inputStyle = {
        backgroundColor: "rgb(10, 25, 45)",
        height: "25px",
        width: "300px",
        color: "white",
        fontFamily: "Didact Gothic",
        fontSize: "20px",
        paddingLeft: "3px",
    };
    const data = [
        ["Username", "text", fieldRefs.username],
        ["Password", "text", fieldRefs.password],
    ].map((data) => {
        return (
            <div style={formItemStyle}>
                <label style={labelStyle}>{data[0]}</label>
                <input type={data[1]} ref={data[2]} style={inputStyle}></input>
            </div>
        );
    });
    return data;
};

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
const LoginForm = (props) => {
    const [res, setRes] = useState(["", -1]);
    const dispatch = useDispatch();
    const fieldRefs = {
        username: createRef(),
        password: createRef(),
    };

    const mainStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "solid 1px white",
    };
    const loginClickHandler = useCallback(() => {
        PushLogin(props.fieldRefs);
    }, [props.fieldRefs]);

    return (
        <div style={mainStyle}>
            <div style={{ fontSize: "30px", paddingBottom: "20px" }}>
                LOGIN FORM
            </div>
            <ResRender res={res} dispatch={dispatch} />
            <GoogleLoginForm
                dispatch={props.dispatch}
                text={"Login"}
                endpoint={"/api/login"}
                setRes={setRes}
            />
            <div>{inputFields(fieldRefs)}</div>
            <Button text={"Login"} backgroundColor={"green"} />
        </div>
    );
};

export { LoginForm };
