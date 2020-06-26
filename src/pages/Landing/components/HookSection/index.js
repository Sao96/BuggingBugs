import React, { useState, createRef, useCallback } from "react";
import { LandingNavbar } from "./components/LandingNavbar";
import { textHoverColor } from "util/ThemeColors"

const TryAppButton = (props) => {
    const [hovered, setHovered] = useState(false);
    const onMouseEnterHandler = useCallback(() => { setHovered(true) }, [setHovered])
    const onMouseLeaveHandler = useCallback(() => { setHovered(false) }, [setHovered])
    console.log(textHoverColor, hovered)
    const containerStyle = {
        padding: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: hovered ? "1px solid " + textHoverColor : "1px solid white",
        color: hovered ? textHoverColor : "white",
        fontFamily: "Montserrat",
        fontWeight: "300",
        fontSize: "22.5px",
        width: "135px",
        height: "22.5px",
        userSelect: "none",
        cursor: "pointer"
    };
    return <div style={containerStyle} onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler}>Try it out!</div>;
};

function HookSection(props) {
    const hookStyle = {
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
    }

    return (
        <section style={hookStyle}>
            <nav>
                <LandingNavbar />
            </nav>
            <img
                style={logoImageStyle}
                alt="BuggingBugs logo, a bug crossed with a code clash between angle brackets"
                src="https://media.discordapp.net/attachments/704894643317243997/723136903070875658/buggingbugW3x.png"
            />
            <h1 style={mainHeaderStyle}>A bug tracking solution.</h1>
            <TryAppButton />
        </section>
    );
};

export { HookSection }