import React, { useState, useEffect, useCallback } from "react";
import Button from "util/Button.jsx";
import { dashboardActions } from "actions/dashboardactions.js";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector, useDispatch } from "react-redux";
import { domain } from "routes";
import { dashboardFields } from "fields/dashboardfields.js";

const processInvite = async (
    accept,
    invId,
    dispatch,
    setLoading,
    invites,
    setInvites
) => {
    dispatch({ type: dashboardActions.SET_INVITE_BOARD_LOCKED });
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const data = { invId: invId };
    const endpoint = domain + accept ? "acceptinvite" : "declineinvite";
    setLoading(true);
    await fetch(endpoint, {
        method: "POST",
        headers: headers,
        credentials: "include",
        mode: "cors",
        cache: "no-cache",
        body: JSON.stringify(data),
        redirect: "follow",
    });
    for (let idx = 0; idx < invites.length; ++idx) {
        if (invites[idx].invId === invId) {
            dispatch({ type: dashboardActions.SET_INVITE_BOARD_UNLOCKED });
            setLoading(false);
            setInvites(invites.slice(0, idx).concat(invites.slice(idx + 1)));
            break;
        }
    }

    dispatch({ type: dashboardActions.SET_INVITES_MODIFIED });
};

const ButtonsDisplay = (props) => {
    const boardLocked = props.boardLocked,
        loading = props.loading,
        acceptButtonHandler = props.acceptHandler,
        declineButtonHandler = props.declineHandler;
    let buttonDisplay = (
        <>
            <Button
                text={"Accept"}
                backgroundColor={"green"}
                onClick={!boardLocked ? acceptButtonHandler : () => {}}
            />
            <div style={{ paddingRight: "10px" }}></div>
            <Button
                text={"Decline"}
                backgroundColor={"rgb(100,0,0)"}
                onClick={!boardLocked ? declineButtonHandler : () => {}}
            />
        </>
    );
    if (loading) {
        buttonDisplay = (
            <ClipLoader size={30} color={"rgb(200,200,200)"} loading={true} />
        );
    }
    return buttonDisplay;
};

function Invite(props) {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const boardLocked = useSelector((state) => {
        return state.dashboard[dashboardFields.INVITE_BOARD_LOCKED];
    });
    const acceptButtonHandler = useCallback(() => {
        processInvite(
            true,
            props.invId,
            dispatch,
            setLoading,
            props.invites,
            props.setInvites
        );
    }, [props.invId, dispatch, setLoading]);
    const declineButtonHandler = useCallback(() => {
        processInvite(
            false,
            props.invId,
            dispatch,
            setLoading,
            props.invites,
            props.setInvites
        );
    });
    const mainStyle = { display: "flex" };
    const nameStyle = {
        fontSize: "20px",
        fontFamily: "Didact Gothic",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    return (
        <main style={mainStyle}>
            <div style={nameStyle}>{props.name}</div>
            <div style={{ paddingRight: "50px" }}></div>
            <ButtonsDisplay
                boardLocked={boardLocked}
                loading={loading}
                acceptHandler={acceptButtonHandler}
                declineHandler={declineButtonHandler}
            />
        </main>
    );
}

export { Invite };
