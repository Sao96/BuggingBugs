import React from "react";
import InviteIcon from "svg/invite2.svg";
import Button from "util/Button.jsx";
import { useDispatch } from "react-redux";

function ModalJoinProject(props) {
    const mainStyle = {
        display: "flex",
        flexWrap: "wrap",
        fontFamily: "didact gothic",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
    };
    const joinGroupSvgStyle = {
        height: "130px",
        width: "130px",
        fill: "rgb(180,180,180)",
    };
    const dispatch = useDispatch();

    return (
        <div style={mainStyle}>
            <InviteIcon style={joinGroupSvgStyle} />
            Enter the add code to the BuggingBugs application:
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <input type="text" id="fname" name="fname"></input>
            </div>
            <Button text={"Join"} backgroundColor="green" />
        </div>
    );
}

export default ModalJoinProject;
