import React, { useState } from "react";
import { sharedActions } from "actions/sharedactions";
function ToolbarItem(props) {
    const onClickHandler = props.handler;
    const [hovered, setHovered] = useState(false);
    const onMouseEnterHandler = () => {
        setHovered(true);
    };
    const onMouseLeaveHandler = () => {
        setHovered(false);
    };
    const Svg = props.Svg;
    const svgStyle = {
        height: "30px",
        width: "30px",
        fill: hovered ? "rgb(187, 235, 252)" : "white",
        position: "relative",
        top: "7px",
    };
    const containerStyle = {
        color: hovered ? "rgb(187, 235, 252)" : "white",
        userSelect: "none",
        fontFamily: "Didact Gothic",
        fontSize: "20px",
        cursor: "pointer",
    };
    return (
        <section
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
            style={containerStyle}
            onClick={onClickHandler}
        >
            <Svg style={svgStyle} /> <span style={{ paddingRight: "5px" }} />
            {props.text}
        </section>
    );
}

export { ToolbarItem };
