import React from "react";
import * as sample from "util/samples.jsx";
import Ticket from "./components/Ticket/ticket.jsx";
import { useSelector, useDispatch } from "react-redux";
import { sharedActions } from "actions/sharedactions.js";
import { sharedFields } from "fields/sharedfields.js";
import { ticketboardFields } from "fields/ticketboardfields.js";

const randomTickets = () => {
    let res = [...sample.premade];
    const filterSelector = (field) => {
        return useSelector((state) => {
            return state.ticketboard[field];
        });
    };
    const mapPirorityToStore = {
        0: filterSelector(ticketboardFields.FILTER_TS_OPEN),
        1: filterSelector(ticketboardFields.FILTER_TS_IN_PROGRESS),
        2: filterSelector(ticketboardFields.FILTER_TS_PENDING_APPROVAL),
        3: filterSelector(ticketboardFields.FILTER_TS_CLOSED),
    };
    const filterActive = ((filterVals) => {
        for (status in filterVals) {
            if (filterVals[status]) return true;
        }
        return false;
    })(mapPirorityToStore);
    if (filterActive) {
        res = res.filter((ticket) => {
            return mapPirorityToStore[ticket.status];
        });
    }

    res.sort((a, b) => {
        if (a.priority < b.priority) {
            return -1;
        } else if (a.priority == b.priority && a.duedate < b.duedate) {
            return -1;
        }
        return 0;
    });

    const templateProps = {
        time: "6 hours",
        dueTime: "Monday, June 25, 12:00 PM PST",
        tags: "React, Javascript, HTML",
        environment: "Chrome v10, Ubuntu 0.31",
        summary:
            "It seems as if the vanguard has system crashes and vulnerabilities and should be removed or refactored immedietely. ",
    };
    return res.map((card) => {
        return <Ticket {...templateProps} {...card} />;
    });
};

function TicketDisplayer(props) {
    const mainStyle = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
    };

    return <div style={mainStyle}> {randomTickets()}</div>;
}

export { TicketDisplayer };
