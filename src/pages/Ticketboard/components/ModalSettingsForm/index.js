import React, { useState, useEffect } from "react";
import { dispatch, useDispatch } from "react-redux";
import { RenameProject } from "./contexts/RenameProject";
import { RemoveUser } from "./contexts/RemoveUser";
import { PromoteUser } from "./contexts/PromoteUser";
import { DemoteSelf } from "./contexts/DemoteSelf";
import { LeaveGroup } from "./contexts/LeaveGroup";
import { ContextsMenu } from "util/ContextsMenu";
import { ticketboardActions } from "actions/ticketboardactions";

function ModalSettingsForm(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch({ type: ticketboardActions.SET_REFRESH_NEEDED });
        };
    });
    const contexts = [
        ["Rename Project", <RenameProject />],
        ["Remove User", <RemoveUser />],
        ["Promote User", <PromoteUser />],
        ["Demote Self", <DemoteSelf />],
        ["Leave Group", <LeaveGroup />],
    ];

    return <ContextsMenu contexts={contexts} />;
}

export { ModalSettingsForm };
