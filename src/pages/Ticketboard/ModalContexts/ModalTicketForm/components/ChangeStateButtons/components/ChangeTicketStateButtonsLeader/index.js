import React from "react";
import { ticketStatusMap } from "statusCodes/tickets";
import { DefaultButton } from "buttons";

function ChangeTicketStateButtonsLeader(props) {
    const ticketStatus = props.ticketStatus;
    const handlers = props.handlers;
    let button1Data, button2Data;
    switch (ticketStatus) {
        case ticketStatusMap["open"]:
            button1Data = ["Close", "green", handlers["closed"]];
            button2Data = null;
            break;
        case ticketStatusMap["pending"]:
            button1Data = ["Approve", "green", handlers["closed"]];
            button2Data = ["Decline", "red", handlers["open"]];
            break;
        case ticketStatusMap["closed"]:
            button1Data = ["Reopen", "green", handlers["open"]];
            button2Data = null;
            break;
    }
    const button1 = (
        <DefaultButton
            text={button1Data[0]}
            backgroundColor={button1Data[1]}
            onClick={!props.disable ? button1Data[2] : null}
        />
    );
    const button2 = button2Data ? (
        <DefaultButton
            text={button2Data[0]}
            backgroundColor={button2Data[1]}
            onClick={!props.disable ? button2Data[2] : null}
        />
    ) : (
        <></>
    );
    return (
        <div style={{ display: "flex" }}>
            {button1}
            <span style={{ paddingLeft: "15px" }} />
            {button2}
        </div>
    );
}

export { ChangeTicketStateButtonsLeader };
