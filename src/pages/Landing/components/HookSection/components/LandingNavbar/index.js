import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { textHoverColor } from "util/ThemeColors";

const LoginButton = (props) => {
    const [hovered, setHovered] = useState(false);
    const onMouseEnterHandler = () => {
        setHovered(true);
    };
    const onMouseLeaveHandler = () => {
        setHovered(false);
    };
    const buttonText = "Login";
    const containerStyle = {
        fontSize: "16px",
        color: hovered ? textHoverColor : "white",
        userSelect: "none",
        cursor: "pointer",
    };
    return (
        <span
            style={containerStyle}
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
            onClick={props.handler}
        >
            {buttonText}
        </span>
    );
};

const RegisterButton = (props) => {
    const [hovered, setHovered] = useState(false);
    const onMouseEnterHandler = () => {
        setHovered(true);
    };
    const onMouseLeaveHandler = () => {
        setHovered(false);
    };
    const buttonText = "Register";
    const containerStyle = {
        padding: "3.5px 5px",
        fontSize: "16px",
        border: hovered ? "0.5px solid " + textHoverColor : "0.5px solid white",
        color: hovered ? textHoverColor : "white",
        cursor: "pointer",
        userSelect: "none",
    };
    return (
        <span
            style={containerStyle}
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
            onClick={props.handler}
        >
            {buttonText}
        </span>
    );
};

function LandingNavbar(props) {
    const [redirectUrl, setRedirect] = useState("");
    if (redirectUrl !== "") {
        return <Redirect push to={redirectUrl} />;
    }
    const loginHandler = () => {
        setRedirect("/login");
    };
    const registerHandler = () => {
        setRedirect("/register");
    };
    const headerText = "BuggingBugs";
    const containerStyle = {
        fontFamily: "Montserrat",
        fontWeight: "400",
        color: "white",
        fontSize: "18px",
        display: "flex",
        marginTop: "9px",
    };

    return (
        <nav style={containerStyle}>
            <header>{headerText}</header>
            <section style={{ paddingLeft: "500px" }}>
                <LoginButton handler={loginHandler} />
                <span style={{ paddingRight: "20px" }}></span>
                <RegisterButton handler={registerHandler} />
            </section>
        </nav>
    );
}

export { LandingNavbar };
