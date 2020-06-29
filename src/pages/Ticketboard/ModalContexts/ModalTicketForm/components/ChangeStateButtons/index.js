import React from "react";
import {
    ChangeTicketStateButtonsLeader,
    ChangeTicketStateButtonsRegular,
} from "./components";

function ChangeStateButtons(props) {
    return props.authLevel === 0 ? (
        <ChangeTicketStateButtonsLeader
            handlers={props.handlers}
            ticketStatus={props.ticketStatus}
        />
    ) : (
        <ChangeTicketStateButtonsRegular
            handlers={props.handlers}
            ticketStatus={props.ticketStatus}
        />
    );
}

export { ChangeStateButtons };
