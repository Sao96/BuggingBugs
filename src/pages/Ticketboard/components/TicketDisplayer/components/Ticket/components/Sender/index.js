import React from "react";

function Sender(props) {
    return (
        <span
            style={{
                position: "absolute",
                paddingTop: "10px",
                paddingLeft: "10px",
                fontSize: "19px",
                fontStyle: "italic",
                MarginBottom: "40px",
            }}
        >
            {props.name}
        </span>
    );
}

export { Sender };
