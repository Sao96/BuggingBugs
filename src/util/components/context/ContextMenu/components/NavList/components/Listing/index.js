import React from "react";

function Listing(props) {
    const onClickHandler = () => {
        props.setActive(props.idx);
    };
    const mainStyle = {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        fontFamily: "Heebo, Source Sans Pro, Didact Gothic",
        color: "white",
        fontSize: "20px",
        backgroundColor: props.active ? "green" : "rgb(0,0,0,0)",
        cursor: "pointer",
        padding: "15px 5px",
        width: "165px",
        borderBottom: "rgb(150,150,150) 1px solid ",
        userSelect: "none",
    };

    return (
        <main style={mainStyle} onClick={onClickHandler}>
            <span style={{ paddingLeft: "13px" }}>{props.title}</span>
        </main>
    );
}

export { Listing };
