import React, { createRef, useCallback } from "react";
import Button from "util/Button.jsx";
import { GoogleLoginForm } from "../GoogleAuthenticate";
import { domain } from "routes";
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

const LoginForm = (props) => {
    const fieldRefs = {
        username: createRef(),
        password: createRef(),
    };

    const mainStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    };
    const loginClickHandler = useCallback(() => {
        PushLogin(props.fieldRefs);
    }, [props.fieldRefs]);

    return (
        <div style={mainStyle}>
            <div style={{ fontSize: "30px", paddingBottom: "20px" }}>
                LOGIN FORM
            </div>
            <GoogleLoginForm text={"Login"} endpoint={"/api/login"} />
            <div>{inputFields(fieldRefs)}</div>
            <Button text={"Login"} backgroundColor={"green"} />
        </div>
    );
};

export { LoginForm };
