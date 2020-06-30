import React, { useState, useEffect, useCallback } from "react";
import { DefaultButton } from "buttons";
import { dashboardActions } from "actions/dashboardactions.js";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector, useDispatch } from "react-redux";
import { domain } from "routes";
import { dashboardFields } from "fields/dashboardfields.js";
import { postProcessInvite } from "apiCalls/BuggingBugs/POST";

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
    }, [setProcessing, dispatch]);
    const declineButtonHandler = useCallback(() => {
        postProcessInvite(
            { invId: props.invId },
            false,
            setProcessing,
            props.invites,
            props.setInvites,
            dispatch
        );
    }, [setProcessing, dispatch]);
    const mainStyle = { display: "flex" };
    const nameStyle = {
        fontSize: "20px",
        fontFamily: "Didact Gothic",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "200px",
    };

    return (
        <main style={mainStyle}>
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
