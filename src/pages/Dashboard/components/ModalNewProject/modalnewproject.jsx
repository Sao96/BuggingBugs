import React from "react";
import InviteIcon from "svg/invite2.svg";
import CreateGroupIcon from "svg/create.svg";
import Button from "util/Button.jsx";
import { useDispatch } from "react-redux";
import { sharedActions } from "actions/sharedactions.js";

export default function NewProjectForm(props) {
    const projFormStyle = {
        display: "flex",
        width: "content-max",
        fontFamily: "didact gothic",
        position: "relative",
    };
    const Divider = () => {
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

    const dispatch = useDispatch();

    const createNewButtonHandler = () => {
        dispatch({ type: sharedActions.PUSH_MODAL_STATE, modalState: 2 });
    };
    const joinExistingButtonHandler = () => {
        dispatch({ type: sharedActions.PUSH_MODAL_STATE, modalState: 3 });
    };

    return (
        <div style={projFormStyle}>
            <div style={choiceStyle}>
                <CreateGroupIcon style={createGroupSvgStyle} />
                <span style={{ marginBottom: "20px" }}>
                    Create a new BuggingBugs project.
                </span>
                <Button
                    onClick={createNewButtonHandler}
                    text={"Create New"}
                    backgroundColor={"green"}
                />
            </div>
            {Divider()}
            <div style={choiceStyle}>
                <InviteIcon style={inviteSvgStyle} />
                <span style={{ marginBottom: "20px" }}>
                    Join an existing BuggingBugs project.
                </span>
                <Button
                    onClick={joinExistingButtonHandler}
                    text={"Join Existing"}
                    backgroundColor={"green"}
                />
            </div>
        </div>
    );
}
