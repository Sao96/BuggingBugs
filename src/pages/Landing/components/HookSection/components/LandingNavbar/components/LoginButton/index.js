import React, { useState } from "react";
import { textHoverColor } from "themeColors";

function LoginButton(props) {
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
}

export { LoginButton };
