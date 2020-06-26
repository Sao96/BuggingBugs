import React from "react";
import { LandingNavbar } from "./components/LandingNavbar";
import { TryAppButton } from "./components/TryAppButton";
import BuggingBugsLogo from "img/buggingbugslogo.png";

function HookSection(props) {
    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        paddingBottom: "30px",
        alignItems: "center",
        justifyContent: "center",
        color: "black",
        fontFamily: " PT Sans, Noto Sans JP",
        background: "#43c6ac",
        background: "-webkit-linear-gradient(to right, #43c6ac, #191654)",
        background: "linear-gradient(to right, #43c6ac, #191654)",
    };
    const headerText = "A bug tracking solution.";
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
    const logoImageStyle = {
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
                style={logoImageStyle}
                alt="BuggingBugs logo, a bug crossed with a code clash between angle brackets"
                src={BuggingBugsLogo}
            />
            <h1 style={mainHeaderStyle}>{headerText}</h1>
            <TryAppButton />
        </section>
    );
}

export { HookSection };
