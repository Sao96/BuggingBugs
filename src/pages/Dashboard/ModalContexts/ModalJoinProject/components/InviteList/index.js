import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Invite, NoInvitesMessage } from "./components";
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
    const InvitesDisplay =
        invites.length > 0 ? (
            invites.map((invite) => {
                return (
                    <Invite
                        name={invite.name}
                        invId={invite.invId}
                        pid={invite.pid}
                        invites={invites}
                        setInvites={setInvites}
                    />
                );
            })
        ) : (
            <NoInvitesMessage />
        );

    return InvitesDisplay;
}
export { InviteList };
