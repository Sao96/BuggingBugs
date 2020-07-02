import React from "react";

function ModalTitle(props) {
    const titleStyle = {
        fontFamily: "Didact Gothic",
        fontSize: props.fontSize ? props.fontSize : "36px",
        marginBottom: "35px",
        color: "rgb(240, 240, 240)",
        width: "100%",
        overflowWrap: "break-word",
        textAlign: "center",
    };
    return <div style={titleStyle}>{props.text}</div>;
}

export { ModalTitle };
