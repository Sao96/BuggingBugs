import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

const LoginButton = (props) => {
    const [hovered, setHovered] = useState(false);
    const onMouseEnterHandler = () => {
        setHovered(true);
    };
    const onMouseLeaveHandler = () => {
        setHovered(false);
    };
    return (
        <span
            style={{
                fontSize: "16px",
                color: hovered ? "rgb(187, 235, 252)" : "white",
                cursor: "pointer",
            }}
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
            onClick={props.handler}
        >
            Login
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
    return (
        <span
            style={{
                padding: "3.5px 5px",
                fontSize: "16px",
                border: hovered
                    ? "0.5px solid rgb(187, 235, 252)"
                    : "0.5px solid white",
                color: hovered ? "rgb(187, 235, 252)" : "white",
                cursor: "pointer",
            }}
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
            onClick={props.handler}
        >
            Register
        </span>
    );
};

function LandingNavbar(props) {
    const [redirectUrl, setRedirect] = useState("");
    if (redirectUrl !== "") {
        return <Redirect push to={redirectUrl} />;
    }
    const mainStyle = {
        fontFamily: "Montserrat",
        fontWeight: "400",
        color: "white",
        fontSize: "18px",
        display: "flex",
        marginTop: "9px",
    };

    return (
        <nav style={mainStyle}>
            <header>BuggingBugs</header>
            {/* <div style={{ paddingRight: "400px" }}></div> */}
            <section style={{ paddingLeft: "500px" }}>
                <LoginButton
                    handler={() => {
                        setRedirect("/login");
                    }}
                />
                <span style={{ paddingRight: "20px" }}></span>
                <RegisterButton
                    handler={() => {
                        setRedirect("/register");
                    }}
                />
            </section>
        </nav>
    );
}

export { LandingNavbar };
