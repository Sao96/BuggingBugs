import React from "react";
import Button from "util/Button.jsx";
import CreateGroupIcon from "svg/create.svg";
function ModalCreateProject(props) {
    const mainStyle = {
        display: "flex",
        flexWrap: "wrap",
        fontFamily: "didact gothic",
        alignItems: "center",
        flexDirection: "column",
    };
    const createGroupSvgStyle = {
        height: "130px",
        width: "130px",
        fill: "rgb(180,180,180)",
    };
    return (
        <div style={mainStyle}>
            <CreateGroupIcon style={createGroupSvgStyle} />
            Enter the name of your new BuggingBugs application:
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <input type="text" id="fname" name="fname"></input>
            </div>
            <Button text={"Create"} backgroundColor="green" />
        </div>
    );
}

export default ModalCreateProject;
