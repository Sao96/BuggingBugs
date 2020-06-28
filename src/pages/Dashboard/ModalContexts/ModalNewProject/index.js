import React from "react";
import { useDispatch } from "react-redux";
import { sharedActions } from "actions/sharedactions.js";
import InviteIcon from "svg/invite2.svg";
import CreateGroupIcon from "svg/create.svg";
import { DefaultButton } from "buttons";
import { Separator } from "./components";

function ModalNewProject(props) {
    const dispatch = useDispatch();
    const createNewButtonHandler = () => {
        dispatch({ type: sharedActions.PUSH_MODAL_STATE, modalState: 2 });
    };
    const joinExistingButtonHandler = () => {
        dispatch({ type: sharedActions.PUSH_MODAL_STATE, modalState: 3 });
    };

    const createHeaderText = "Create a new BuggingBugs project.";
    const joinHeaderText = "Join an existing BuggingBugs project.";
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
    const containerStyle = {
        display: "flex",
        fontFamily: "didact gothic",
    };

    return (
        <article style={containerStyle}>
            <section style={choiceStyle}>
                <CreateGroupIcon style={createGroupSvgStyle} />
                <header style={{ marginBottom: "20px" }}>
                    {createHeaderText}
                </header>
                <DefaultButton
                    onClick={createNewButtonHandler}
                    text={"Create New"}
                    backgroundColor={"green"}
                />
            </section>
            <Separator />
            <section style={choiceStyle}>
                <InviteIcon style={inviteSvgStyle} />
                <header style={{ marginBottom: "20px" }}>
                    {joinHeaderText}
                </header>
                <DefaultButton
                    onClick={joinExistingButtonHandler}
                    text={"Join Existing"}
                    backgroundColor={"green"}
                />
            </section>
        </article>
    );
}

export { ModalNewProject };
