import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sharedActions } from "actions/sharedactions.js";
import { sharedFields } from "fields/sharedfields.js";
import { ticketboardFields } from "fields/ticketboardfields.js";
import { TypeFilter, Ticket } from "./components";

// const randomTickets = () => {
//     let res = [...sample.premade];
//     const filterSelector = (field) => {
//         return useSelector((state) => {
//             return state.ticketboard[field];
//         });
//     };
//     const mapPirorityToStore = {
//         0: filterSelector(ticketboardFields.FILTER_TS_OPEN),
//         1: filterSelector(ticketboardFields.FILTER_TS_IN_PROGRESS),
//         2: filterSelector(ticketboardFields.FILTER_TS_PENDING_APPROVAL),
//         3: filterSelector(ticketboardFields.FILTER_TS_CLOSED),
//     };
//     const filterActive = ((filterVals) => {
//         for (status in filterVals) {
//             if (filterVals[status]) return true;
//         }
//         return false;
//     })(mapPirorityToStore);
//     if (filterActive) {
//         res = res.filter((ticket) => {
//             return mapPirorityToStore[ticket.status];
//         });
//     }

//     res.sort((a, b) => {
//         if (a.priority < b.priority) {
//             return -1;
//         } else if (a.priority == b.priority && a.duedate < b.duedate) {
//             return -1;
//         }
//         return 0;
//     });

//     const templateProps = {
//         dueTime: "Monday, June 25, 12:00 PM PST",
//         tags: "React, Javascript, HTML",
//         environment: "Chrome v10, Ubuntu 0.31",
//         headline:
//             "It seems as if the vanguard has system crashes and vulnerabilities and should be removed or refactored immedietely. ",
//     };
//     return res.map((card) => {
//         return <Ticket {...templateProps} {...card} />;
//     });
// };

// const getOpenTickets = ()

/**
 *
 * @param {*} tickets a DB response of tickets
 * @return a list of lists, where each list corresponds to the tickets of
 * a certain status.
 */
const generateTicketCards = (tickets, authLevel, usersMap) => {
    const openTickets = [],
        pendingTickets = [],
        closedTickets = [];
    for (let idx in tickets) {
        let ticket = tickets[idx];
        let fromInfo = usersMap[ticket.from],
            toInfo = usersMap[ticket.to],
            cardPfp,
            cardName;
        if (authLevel === 0) {
            cardPfp = toInfo.pfp;
            cardName = toInfo.name;
        } else {
            cardPfp = fromInfo.pfp;
            cardName = fromInfo.name;
        }
        const nextTicket = (
            <Ticket
                {...ticket}
                cardPfp={cardPfp}
                fromPfp={fromInfo.pfp}
                fromName={fromInfo.name}
                cardName={cardName}
            />
        );
        switch (ticket.status) {
            case 0:
                openTickets.push(nextTicket);
                break;
            case 1:
                pendingTickets.push(nextTicket);
                break;
            case 2:
                closedTickets.push(nextTicket);
                break;
            default:
                openTickets.push(nextTicket);
        }
    }

    return [openTickets, pendingTickets, closedTickets];
};

function TicketDisplayer(props) {
    const [activeSection, setActiveSection] = useState(0);
    const [openTickets, pendingTickets, closedTickets] = generateTicketCards(
        props.tickets,
        props.authLevel,
        props.users
    );
    const ticketTypes = [
        ["Open", openTickets.length],
        ["Pending", pendingTickets.length],
        ["Closed", closedTickets.length],
    ];
    let selectedCards;
    switch (activeSection) {
        case 0:
            selectedCards = openTickets;
            break;
        case 1:
            selectedCards = pendingTickets;
            break;
        case 2:
            selectedCards = closedTickets;
            break;
    }
    const ticketLayoutStyle = {
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "30px",
    };
    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    };

    return (
        <div style={containerStyle}>
            <TypeFilter
                types={ticketTypes}
                active={activeSection}
                setState={setActiveSection}
            />
            <div style={ticketLayoutStyle}>{selectedCards} </div>
        </div>
    );
}

export { TicketDisplayer };
