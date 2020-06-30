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
            disable={props.disable}
        />
    ) : (
        <ChangeTicketStateButtonsRegular
            handlers={props.handlers}
            ticketStatus={props.ticketStatus}
            disable={props.disable}
        />
    );
}

export { ChangeStateButtons };
