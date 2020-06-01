import React, { createRef, useCallback } from "react";
import Button from "util/Button.jsx";

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
        ["Username", "text", fieldRefs.username],
        ["Password", "text", fieldRefs.password],
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
    const data = {};
    for (let field in regInfoRefs) {
        if (regInfoRefs[field].current) {
            data[field] = regInfoRefs[field].current.value;
        }
    }
    const url = "http://localhost:3000/register";
    const res = await fetch(url, {
        method: "POST",
        mode: "no-cors",
        cache: "no-cache",
        redirect: "follow",
        body: JSON.stringify(data),
    });
    console.log(res);
};

const RegisterForm = (props) => {
    const fieldRefs = {
        email: createRef(),
        username: createRef(),
        password: createRef(),
        repassword: createRef(),
    };

    const mainStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    };
    const registerClickHandler = useCallback(() => {
        PushRegister(props.fieldRefs);
    }, [props.fieldRefs]);

    return (
        <div style={mainStyle}>
            <div style={{ fontSize: "30px", paddingBottom: "20px" }}>
                REGISTER FORM
            </div>
            <div>{inputFields(fieldRefs)}</div>
            <Button text={"Register"} backgroundColor={"green"} />
        </div>
    );
};

export { RegisterForm };
