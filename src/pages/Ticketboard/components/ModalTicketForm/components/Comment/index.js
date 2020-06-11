import React from "react";

function Comment(props) {
    const commentBoxStyle = {
        backgroundColor: "rgb(70,100,120, 0.7)",
        border: "solid",
        borderWidth: "1px",
        borderColor: "black",
        paddingLeft: "10px",
        paddingTop: "10px",
        position: "relative",
        display: "flex",
        color: "white",
        marginBottom: "10px",
        fontFamily: "Didact Gothic, Quattrocento Sans",
        boxShadow: "1px 1px 1px 0px rgba(0,0,0,0.75)",
        paddingRight: "20px",
    };
    const imgStyle = {
        height: "40px",
        width: "40px",
        borderRadius: "50%",
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: "1px",
        marginRight: "5px",
    };
    const closeSvgStyle = {
        height: "30px",
        width: "30px",
        display: "inline",
        position: "absolute",
        left: "96%",
        top: "-3px",
        fill: "rgb(230,230,230)",
    };

    return (
        <div style={commentBoxStyle}>
            <img style={imgStyle} src={props.pfp} />
            <div style={{ position: "relative", left: "10px" }}>
                <span style={{ fontSize: "16px", paddingRight: "8px" }}>
                    {props.name}
                </span>
                <span style={{ fontSize: "14px", color: "rgb(209, 209, 209)" }}>
                    {props.date}
                </span>
                <CloseIcon style={closeSvgStyle} />
                <p
                    style={{
                        position: "relative",
                        maxWidth: "1000px",
                        fontSize: "16px",
                    }}
                >
                    {props.message}
                </p>
            </div>
        </div>
    );
}

export { Comment };
