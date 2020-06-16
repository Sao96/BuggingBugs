import React, { useState } from "react";
import { RenameProject } from "./contexts/RenameProject";
import { RemoveUser } from "./contexts/RemoveUser";
import { PromoteUser } from "./contexts/PromoteUser";
import { DemoteSelf } from "./contexts/DemoteSelf";
import { LeaveGroup } from "./contexts/LeaveGroup";
import { ContextsMenu } from "util/ContextsMenu";

function ModalSettingsForm(props) {
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
