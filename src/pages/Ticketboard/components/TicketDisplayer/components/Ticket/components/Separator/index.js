import React from "react";

function Separator(props) {
    const containerStyle = {
        border: "1px solid " + props.color,
        width: "90%",
        marginBottom: "7px",
    };
    return <div style={containerStyle}> </div>;
}

export { Separator };
