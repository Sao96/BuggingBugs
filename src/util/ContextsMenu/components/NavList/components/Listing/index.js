import React from "react";

function Listing(props) {
    const onClickHandler = () => {
        props.setActive(props.idx);
    };
    const mainStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Heebo, Source Sans Pro, Didact Gothic",
        color: "white",
        fontSize: "20px",
        backgroundColor: props.active ? "green" : "rgb(0,0,0,0)",
        cursor: "pointer",
        // borderBottom: "rgb(100,100,120) solid 2px",
        padding: "15px 5px",
        width: "150px",
    };

    return (
        <main style={mainStyle} onClick={onClickHandler}>
            {props.title}
        </main>
    );
}

export { Listing };
