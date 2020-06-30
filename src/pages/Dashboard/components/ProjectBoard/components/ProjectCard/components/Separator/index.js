import React from "react";
function Separator(props) {
    const containerStyle = {
        border: "1px solid " + props.color,
        width: "95%",
    };
    return <div style={containerStyle} />;
}

export { Separator };
