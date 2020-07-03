import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { RenameProject } from "./contexts/RenameProject";
import { ChangeGroupImage } from "./contexts/ChangeGroupImage";
import { RemoveUser } from "./contexts/RemoveUser";
import { PromoteUser } from "./contexts/PromoteUser";
import { DemoteSelf } from "./contexts/DemoteSelf";
import { LeaveGroup } from "./contexts/LeaveGroup";
import { ContextMenu } from "util/components/context";
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
        ["Group Image", <ChangeGroupImage />],
        ["Remove User", <RemoveUser />],
        ["Promote User", <PromoteUser />],
        ["Demote Self", <DemoteSelf />],
        ["Leave Group", <LeaveGroup />],
    ];

    return <ContextMenu contexts={contexts} />;
}

export { ModalSettingsForm };
