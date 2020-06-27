import React from "react";

function ErrorBox(props) {
    return (
        <div
            style={{
                backgroundColor: "rgb(150,0,0)",
                border: "1px solid red",
                fontFamily: "Didact Gothic",
                padding: "10px",
                marginBottom: "10px",
            }}
        >
            {props.text}
        </div>
    );
}

export { ErrorBox };
