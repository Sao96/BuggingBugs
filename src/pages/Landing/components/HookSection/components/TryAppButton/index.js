import React, { useState } from "react";
import { textHoverColor } from "util/ThemeColors";

function TryAppButton(props) {
    const [hovered, setHovered] = useState(false);
    const onMouseEnterHandler = () => {
        setHovered(true);
    };
    const onMouseLeaveHandler = () => {
        setHovered(false);
    };
    const buttonText = "Try it out!";
    const containerStyle = {
        padding: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: hovered ? "1px solid " + textHoverColor : "1px solid white",
        color: hovered ? textHoverColor : "white",
        fontFamily: "Montserrat",
        fontWeight: "300",
        fontSize: "20px",
        width: "135px",
        height: "22.5px",
        userSelect: "none",
        cursor: "pointer",
    };
    return (
        <div
            style={containerStyle}
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
        >
            {buttonText}
        </div>
    );
}

export { TryAppButton };
