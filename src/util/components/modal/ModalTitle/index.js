import React from "react";

function ModalTitle(props) {
    const titleStyle = {
        fontFamily: "Didact Gothic",
        fontSize: "36px",
        marginBottom: "35px",
        color: "rgb(240, 240, 240)",
    };
    return <header style={titleStyle}>{props.text}</header>;
}

export { ModalTitle };
