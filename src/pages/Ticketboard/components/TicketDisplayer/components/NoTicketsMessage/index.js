import React from "react";

function NoTicketsMessage(props) {
    return (
        <div
            style={{
                fontSize: "30px",
                fontFamily: "Didact Gothic",
                color: "rgb(230,230,230)",
                paddingTop: "50px",
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
