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
        ["Email", "text", fieldRefs.email],
        ["First Name", "text", fieldRefs.firstName],
        ["Last Name", "text", fieldRefs.lastName],
        ["Password (8 or more characters)", "text", fieldRefs.password],
        ["Enter Password Again", "text", fieldRefs.repassword],
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

const PushRegister = async (regInfoRefs) => {
    const data = { type: "native" };
    for (let field in regInfoRefs) {
        if (regInfoRefs[field].current) {
            data[field] = regInfoRefs[field].current.value;
        }
    }
    const endpoint = domain + "register";
    const res = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",
        cache: "no-cache",
        redirect: "follow",
        body: JSON.stringify(data),
    });
};

const RegisterForm = (props) => {
    const fieldRefs = {
        email: createRef(),
        firstName: createRef(),
        lastName: createRef(),
        password: createRef(),
        repassword: createRef(),
    };

    const mainStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    };
    const registerClickHandler = useCallback(() => {
        PushRegister(fieldRefs);
    }, [fieldRefs]);

    return (
        <div style={mainStyle}>
            <div style={{ fontSize: "30px", paddingBottom: "20px" }}>
                REGISTER FORM
            </div>
            <GoogleLoginForm
                text={"Register"}
                endpoint={domain + "/register"}
            />
            <div>{inputFields(fieldRefs)}</div>
            <Button
                onClick={registerClickHandler}
                text={"Register"}
                backgroundColor={"green"}
            />
        </div>
    );
};

export { RegisterForm };
