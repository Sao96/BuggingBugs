import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Invite } from "./components/Invite";
import { dashboardActions } from "actions/dashboardactions";
function InviteList(props) {
    const [invites, setInvites] = useState(props.invites);
    const boardStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: dashboardActions.SET_INVITE_BOARD_UNLOCKED });
    }, []);

    return invites.map((invite) => {
        return (
            <Invite
                name={invite.name}
                invId={invite.invId}
                pid={invite.pid}
                invites={invites}
                setInvites={setInvites}
            />
        );
    });
}
export { InviteList };
