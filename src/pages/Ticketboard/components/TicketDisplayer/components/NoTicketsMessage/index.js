import React from "react";

function NoTicketsMessage(props) {
    return (
        <div
            style={{
                fontSize: "30px",
                fontFamily: "Didact Gothic",
                color: "rgb(230,230,230)",
                padding: "50px 0px",
                display: "flex",
                alignItems: "center",
                width: "100%",
            }}
        >
            No tickets available to display.
        </div>
    );
}

export { NoTicketsMessage };
