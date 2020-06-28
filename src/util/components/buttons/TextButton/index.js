import React, { useState } from "react";
import { textHoverColor } from "themeColors";
function TextButton(props) {
    const [hovered, setHovered] = useState(false);
    const onMouseEnterHandler = () => {
        setHovered(true);
    };
    const onMouseLeaveHandler = () => {
        setHovered(false);
    };
    return (
        <div
            style={{
                display: "inline-block",
                backgroundColor: props.backgroundColor,
                color: "white",
                fontFamily: "Didact Gothic, Quattrocento Sans",
                padding: "12px",
                fontSize: "18px",
                cursor: "pointer",
                userSelect: "none",
            }}
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
            onClick={props.onClick}
        >
            {props.text}
        </div>
    );
}

export { TextButton };
