import React from "react";
import { ticketStatusMap } from "statusCodes/tickets";
import { DefaultButton } from "buttons";

function ChangeTicketStateButtonsRegular(props) {
    const ticketStatus = props.ticketStatus;
    const handlers = props.handlers;
    let buttonData;
    switch (ticketStatus) {
        case ticketStatusMap["open"]:
            buttonData = ["Request Review", "green", handlers["pending"]];
            break;
        case ticketStatusMap["pending"]:
            buttonData = ["Cancel Review", "red", handlers["open"]];
            break;
        case ticketStatusMap["closed"]:
            const closedButtonStyle = {
                display: "flex",
                justifyContent: "center",
                padding: "10px",
                fontFamily: "Didact Gothic",
                fontSize: "20px",
            };
            return <div style={closedButtonStyle}>Ticket is closed.</div>;
    }

    return (
        <DefaultButton
            text={buttonData[0]}
            backgroundColor={buttonData[1]}
            onClick={buttonData[2]}
        />
    );
}

export { ChangeTicketStateButtonsRegular };
