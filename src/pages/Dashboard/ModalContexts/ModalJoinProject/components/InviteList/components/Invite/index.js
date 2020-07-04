import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { DefaultButton } from "buttons";
import { postProcessInvite } from "apiCalls/BuggingBugs/POST";
import { modalTheme1 } from "themeColors";
function Invite(props) {
    const [processing, setProcessing] = useState(false);
    const dispatch = useDispatch();
    const acceptButtonHandler = useCallback(() => {
        postProcessInvite(
            { invId: props.invId },
            true,
            setProcessing,
            props.invites,
            props.setInvites,
            dispatch
        );
    }, [props.invites, setProcessing, dispatch]);
    const declineButtonHandler = useCallback(() => {
        postProcessInvite(
            { invId: props.invId },
            false,
            setProcessing,
            props.invites,
            props.setInvites,
            dispatch
        );
    }, [props.invites, setProcessing, dispatch]);
    const containerStyle = {
        display: "flex",
        backgroundColor: modalTheme1,
        padding: "20px",
        border: "2px solid rgb(50,50,50)",
    };
    const nameStyle = {
        fontSize: "20px",
        fontFamily: "Didact Gothic",
        color: "white",
        display: "flex",
        overflowWrap: "break-word",
        alignItems: "center",
        width: "200px",
        flexFlow: "row wrap",
        wordBreak: "break-all",
    };

    return (
        <main style={containerStyle}>
            <div style={nameStyle}>{props.name}</div>
            <div style={{ paddingRight: "50px" }}></div>
            <DefaultButton
                text={"Accept"}
                backgroundColor={"green"}
                onClick={!processing ? acceptButtonHandler : null}
            />
            <span style={{ paddingRight: "10px" }} />
            <DefaultButton
                text={"Decline"}
                backgroundColor={"rgb(150,0,0)"}
                onClick={!processing ? declineButtonHandler : null}
            />
        </main>
    );
}

export { Invite };
