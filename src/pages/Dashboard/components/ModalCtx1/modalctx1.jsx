import React from "react";
import InviteIcon from "svg/invite2.svg";
import CreateGroupIcon from "svg/create.svg";
import Button from "util/Button.jsx";

export default function NewProjectForm(props) {
    const projFormStyle = {
        display: "flex",
        width: "content-max",
        fontFamily: "didact gothic",
    };
    const Divider = (color) => {
        const style = {
            height: "300px",
            width: "1px",
            backgroundColor: "rgb(200,200,200)",
        };
        return <div style={style}></div>;
    };

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
        flexWrap: "wrap",
        flexDirection: "column",
        alignItems: "center",
    };
    return (
        <div style={projFormStyle}>
            <div style={choiceStyle}>
                <CreateGroupIcon style={createGroupSvgStyle} />
                Create a new BuggingBugs project.
                <div style={{ marginTop: "20px" }}>
                    <Button text={"Create New"} backgroundColor={"green"} />
                </div>
            </div>
            {Divider("red")}
            <div style={choiceStyle}>
                <InviteIcon style={inviteSvgStyle} />
                Join an existing BuggingBugs project.
                <div style={{ marginTop: "20px" }}>
                    <Button text={"Join Existing"} backgroundColor={"green"} />
                </div>
            </div>
        </div>
    );
}
