import React from "react";
import { Separator } from "./components";
import { useDesktop } from "util/responsive";

function SectionLayout(props) {
    const desktop = useDesktop();
    const titleStyle = { fontSize: "30px", margin: "30px 0px" };
    const informationStyle = {
        width: desktop ? "600px" : "300px",
        backgroundColor: "rgb(150,150,150, 0.8)",
        padding: "10px",
        border: "1px solid rgb(50,50,50)",
        marginBottom: "30px",
    };
    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "80%",
        paddingBottom: "100px",
    };
    const informationSection =
        props.informationText.length > 0 ? (
            <div style={informationStyle}>{props.informationText}</div>
        ) : (
            <></>
        );
    return (
        <section style={containerStyle}>
            <Separator />
            <header style={titleStyle}>{props.title}</header>
            {informationSection}
            {props.children}
        </section>
    );
}

export { SectionLayout };
