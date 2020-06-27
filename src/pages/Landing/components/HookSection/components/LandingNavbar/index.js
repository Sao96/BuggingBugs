import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { LoginButton, RegisterButton } from "./components";
import { navRoutes } from "navRoutes";

function LandingNavbar(props) {
    const [redirectUrl, setRedirect] = useState("");
    if (redirectUrl !== "") {
        return <Redirect push to={redirectUrl} />;
    }
    const loginHandler = () => {
        setRedirect(navRoutes.login);
    };
    const registerHandler = () => {
        setRedirect(navRoutes.register);
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
