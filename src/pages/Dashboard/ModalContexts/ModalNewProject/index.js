import React from "react";
import { useDispatch } from "react-redux";
import { sharedActions } from "actions/sharedactions.js";
import InviteIcon from "svg/invite2.svg";
import CreateGroupIcon from "svg/create.svg";
import { OptionSection, Separator } from "./components";

function ModalNewProject(props) {
    const dispatch = useDispatch();
    const createNewButtonHandler = () => {
        dispatch({ type: sharedActions.PUSH_MODAL_STATE, modalState: 2 });
    };
    const joinExistingButtonHandler = () => {
        dispatch({ type: sharedActions.PUSH_MODAL_STATE, modalState: 3 });
    };

    const containerStyle = {
        display: "flex",
        fontFamily: "didact gothic",
    };

    return (
        <article style={containerStyle}>
            <OptionSection
                Svg={CreateGroupIcon}
                headerText="Create a new BuggingBugs project."
                buttonOnClick={createNewButtonHandler}
                buttonText="Create New"
            />
            <Separator />
            <OptionSection
                Svg={InviteIcon}
                headerText="Join an existing BuggingBugs project."
                buttonOnClick={joinExistingButtonHandler}
                buttonText="Join Existing"
            />
        </article>
    );
}

export { ModalNewProject };
