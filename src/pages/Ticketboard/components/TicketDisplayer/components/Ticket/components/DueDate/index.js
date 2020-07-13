import React from "react";

function DueDate(props) {
    const date = new Date(props.date);
    let cardDate;
    if (isNaN(date)) {
        cardDate = "N/A";
    } else {
        cardDate =
            String(date.getMonth() + 1) +
            "/" +
            String(date.getDate() + 1) +
            "/" +
            String(date.getFullYear());
    }
    return (
        <span
            style={{
                position: "absolute",
                right: "8.3%",
                top: "82.2%",
                fontStyle: "italic",
                color: "rgb(200,200,200)",
            }}
        >
            Due: {cardDate}
        </span>
    );
}

export { DueDate };
