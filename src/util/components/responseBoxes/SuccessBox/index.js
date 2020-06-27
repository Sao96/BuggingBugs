import React from "react";

function SuccessBox(props) {
    return (
        <div
            style={{
                backgroundColor: "rgb(0,100,0)",
                border: "1px solid rgb(0,200,0)",
                fontFamily: "Didact Gothic",
                padding: "10px",
                marginBottom: "10px",
            }}
        >
            {props.text}
        </div>
    );
}

export { SuccessBox };
