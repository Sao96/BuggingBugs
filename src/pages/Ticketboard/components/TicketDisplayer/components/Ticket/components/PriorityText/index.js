import React from "react";

function PriorityText(props) {
    const containerStyle = {
        position: "absolute",
        left: "27%",
        top: "80.2%",
        fontStyle: "italic",
        color: "rgb(200,200,200)",
        display: props.desktop ? "" : "none",
    };
    const textStyle = {
        color: props.color,
        fontSize: "21px",
        fontStyle: "normal",
    };
    return (
        <span style={containerStyle}>
            Priority:
            <span style={textStyle}> {props.text}</span>
        </span>
    );
}

export { PriorityText };
