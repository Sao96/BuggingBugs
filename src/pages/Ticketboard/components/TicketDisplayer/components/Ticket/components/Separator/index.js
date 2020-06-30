import React from "react";

function Separator(props) {
    return (
        <div
            style={{
                border: "1px solid " + props.color,
                width: "90%",
                marginBottom: "7px",
            }}
        />
    );
}

export { Separator };
