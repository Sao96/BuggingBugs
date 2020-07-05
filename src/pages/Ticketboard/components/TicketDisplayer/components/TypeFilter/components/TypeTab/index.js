import React, { useState } from "react";

function TypeTab(props) {
    const active = props.active;
    const onClickHandler = props.handler;
    const [hovered, setHovered] = useState(false);
    const onMouseEnterHandler = () => {
        setHovered(true);
    };
    const onMouseLeaveHandler = () => {
        setHovered(false);
    };
    let color, border;
    if (active) {
        color = "white";
        border = "2px solid red";
    } else if (hovered && !active) {
        color = "rgb(50,50,50)";
        border = "2px solid red";
    } else {
        color = "rgb(50,50,50)";
        border = "2px gray solid";
    }
    const containerStyle = {
        padding: "5px 15px",
        width: "100px",
        height: "30px",
        border: border,
        backgroundColor: active ? "rgb(255, 118, 87)" : "rgb(200,200,200)",
        fontFamily: "Didact Gothic",
        color: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        userSelect: "none",
    };
    return (
        <div
            style={containerStyle}
            onClick={onClickHandler}
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
        >
            {props.type + " (" + props.numItems + ")"}
        </div>
    );
}
export { TypeTab };

// const TypeTab = (props) => {
//     const containerStyle = {
//         padding: "5px 15px",
//         border: "2px solid red",
//         backgroundColor: "rgb(255, 118, 87)",
//         fontFamily: "Didact Gothic",
//         color: "white",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         cursor: "pointer",
//     };
//     return <div style={containerStyle}>Open (10)</div>;
// };
// const TypeTab2 = (props) => {
//     const containerStyle = {
//         padding: "5px 15px",
//         border: "2px gray solid",
//         backgroundColor: "rgb(200,200,200)",
//         fontFamily: "Didact Gothic",
//         color: "rgb(50,50,50)",
//         display: "flex",
//         alignItems: "center",
//         cursor: "pointer",
//     };
//     return <div style={containerStyle}>Pending (5)</div>;
// };
