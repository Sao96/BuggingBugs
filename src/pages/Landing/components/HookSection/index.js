import React from "react";
import { LandingNavbar, TryAppButton } from "./components";
import MainLogo from "img/mainlogo.png";
import { mainLogoAltText } from "altTexts";

function HookSection(props) {
    const headerText = "A bug tracking solution.";
    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        paddingBottom: "40px",
        alignItems: "center",
        justifyContent: "center",
        color: "black",
        fontFamily: " PT Sans, Noto Sans JP",
        background: "#43c6ac",
        background: "-webkit-linear-gradient(to right, #43c6ac, #191654)",
        background: "linear-gradient(to right, #43c6ac, #191654)",
    };
    const mainHeaderStyle = {
        color: "white",
        fontSize: "45px",
        marginTop: "0px",
        marginBottom: "0px",
        fontFamily: "Montserrat",
        fontWeight: "200",
        position: "relative",
        paddingTop: "90px",
        paddingBottom: "90px",
    };
    const mainLogoImageStyle = {
        width: "450px",
        height: "165px",
        position: "relative",
        top: "40px",
        userSelect: "none",
    };

    return (
        <section style={containerStyle}>
            <LandingNavbar />
            <img
                style={mainLogoImageStyle}
                alt={mainLogoAltText}
                src={MainLogo}
            />
            <h1 style={mainHeaderStyle}>{headerText}</h1>
            <TryAppButton />
        </section>
    );
}

export { HookSection };
