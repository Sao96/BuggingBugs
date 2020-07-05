import React from "react";

function FeatureListing(props) {
    const Svg = props.svg;
    const title = props.title;
    const mainText = props.mainText;
    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "280px",
        height: "300px",
    };
    const svgStyle = {
        height: "150px",
        width: "150px",
        fill: "rgb(0, 161, 255)",
    };
    const titleStyle = {
        fontSize: "30px",
        fontFamily: "Montserrat",
        color: "rgb(50,50,50)",
        marginBottom: "8px",
        textAlign: "center",
    };
    const mainStyle = {
        fontSize: "20px",
        fontFamily: "Montserrat",
        color: "rgb(70,70,70)",
        textAlign: "center",
    };
    return (
        <section style={containerStyle}>
            <Svg style={svgStyle} />
            <div style={titleStyle}>{title}</div>
            <main style={mainStyle}>{mainText}</main>
        </section>
    );
}

export { FeatureListing };
