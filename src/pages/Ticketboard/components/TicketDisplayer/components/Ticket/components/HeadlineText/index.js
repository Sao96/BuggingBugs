import React from "react";

function HeadlineText(props) {
    return (
        <span
            style={{
                textAlign: "center",
                // position: "absolute",
                margin: "0px 3px 0px",
            }}
        >
            {props.text}
        </span>
    );
}

export { HeadlineText };
