import React from "react";
import { DefaultButton } from "buttons";

function OptionSection(props) {
    const createGroupSvgStyle = {
        height: "130px",
        width: "130px",
        fill: "rgb(180,180,180)",
    };
    const inviteSvgStyle = {
        height: "130px",
        width: "130px",
        fill: "rgb(180,180,180)",
    };
    const choiceStyle = {
        margin: "20px 100px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    };
    return (
        <section style={choiceStyle}>
            <props.Svg style={createGroupSvgStyle} />
            <header style={{ marginBottom: "20px" }}>{props.headerText}</header>
            <DefaultButton
                onClick={props.buttonOnClick}
                text={props.buttonText}
                backgroundColor={"green"}
            />
        </section>
    );
}

export { OptionSection };
