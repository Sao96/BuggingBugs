import React, { useState } from "react";
import { textHoverColor } from "themeColors";

function RegisterButton(props) {
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
}

export { RegisterButton };
