import React from "react";

function HeadlineText(props) {
    const MAX_LENGTH = 200;
    const text =
        props.text.length <= MAX_LENGTH
            ? props.text
            : props.text.slice(0, MAX_LENGTH - 3) + "...";
    return (
        <div
            style={{
                display: "flex",
                width: "90%",
                height: "200px",
                marginLeft: "15px",
            }}
        >
            <main
                style={{
                    width: "100%",
                    height: "100%",
                    wordWrap: "break-word",
                    fontSize: "16px",
                }}
            >
                {text}
            </main>
        </div>
    );
}

export { HeadlineText };
