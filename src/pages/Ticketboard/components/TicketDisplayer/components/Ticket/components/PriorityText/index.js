import React from "react";

function PriorityText(props) {
    return (
        <span
            style={{
                position: "absolute",
                left: "27%",
                top: "80.2%",
                fontStyle: "italic",
                color: "rgb(200,200,200)",
            }}
        >
            Priority:
            <span
                style={{
                    color: props.priorityColor,
                    fontSize: "21px",
                    fontStyle: "normal",
                }}
            >
                {" "}
                {props.text}
            </span>
        </span>
    );
}

export { PriorityText };
