import React from "react";
import { LandingNavbar, TryAppButton } from "./components";
import MainLogo from "img/mainlogo.png";
import { mainLogoAltText } from "altTexts";
import { useDesktop } from "util/responsive";

function HookSection(props) {
    const desktop = useDesktop();
    const headerText = "A bug tracking solution.";
    const containerStyle = {
        display: "flex",
        width: "100%",
        paddingBottom: "40px",
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
        width: desktop ? "450px" : "320px",
        maxWidth: "100%",
        height: desktop ? "165px" : "118px",
        position: "relative",
        top: "40px",
        userSelect: "none",
    };

    return (
        <section style={containerStyle}>
            <section
                style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    width: "100%",
                }}
            >
                <LandingNavbar />
                <img
                    style={mainLogoImageStyle}
                    alt={mainLogoAltText}
                    src={MainLogo}
                />
                <h1 style={mainHeaderStyle}>{headerText}</h1>
                <TryAppButton />
            </section>
        </section>
    );
}

export { HookSection };
