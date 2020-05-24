import React from "react";
import Dots from "svg/dots.svg";

function List() {
    const liStyle = {
        backgroundColor: "red",
        padding: "10px",
        position: "fixed",
    };
    return (
        <ul style={{ listStyle: "none" }}>
            <li style={liStyle}>Coffeeaaaaaaaaaaaaaaaaaaaaaa</li>
            <li style={liStyle}>Tea</li>
        </ul>
    );
}

function ButtonHandler() {
    const mainStyle = {
        display: "inline-block",
        position: "relative",
        left: "80%",
    };
    const svgStyle = {
        height: "50px",
        width: "50px",
        fill: "rgb(190,190,190)",
    };

    return (
        <div style={mainStyle}>
            <Dots style={svgStyle} />
            {List()}
        </div>
    );
}

export { ButtonHandler };
