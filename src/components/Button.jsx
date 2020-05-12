import React from "react";

export default function Button(props) {
    const buttonHover = (e) => {
        for (let prop in hoverStyle) {
            e.target.style[prop] = hoverStyle[prop];
        }
    };
    const buttonLeave = (e) => {
        for (let prop in unHoverStyle) {
            e.target.style[prop] = unHoverStyle[prop];
        }
    };
    const hoverStyle = {
        color: "rgb(203, 234, 244)",
    };
    const unHoverStyle = {
        color: "white",
    };

    const btnStyle = {
        display: "inline-block",
        backgroundColor: props.backgroundColor,
        color: "white",
        fontFamily: "Didact Gothic, Quattrocento Sans",
        padding: "12px",
        fontSize: "18px",
        border: "solid 1px rgb(73, 99, 114)",
        cursor: "pointer",
    };
    return (
        <div>
            <div
                onMouseEnter={buttonHover}
                onMouseOut={buttonLeave}
                style={btnStyle}
            >
                Display Filters
            </div>
        </div>
    );
}
