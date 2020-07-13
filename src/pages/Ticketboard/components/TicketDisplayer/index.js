import React, { useState, useEffect } from "react";
import { TypeFilter, Ticket, NoTicketsMessage } from "./components";
import { ticketCardStyles as tcStyles } from "styles";
import { mobileWidth, mediaQueryCustom, useDesktop } from "util/responsive";

/**
 * @function generateTicketCards
 * @param {Array} tickets a DB response of tickets
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
                marginRight={tcStyles.dimensions.marginRight}
                key={ticket._id}
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

    const tcDimensions = tcStyles.dimensions;
    const [shadowWidth, navbarWidth, borderWidth] = [4, 150, 1];
    const totalTicketWidth =
        tcDimensions.width +
        tcDimensions.marginRight +
        shadowWidth +
        borderWidth;
    const [large, medium] = [
        totalTicketWidth * 3 + navbarWidth + "px",
        mobileWidth + "px",
    ].map((width) => {
        return mediaQueryCustom(width);
    });
    let containerWidth,
        desktop = true;
    if (large) {
        containerWidth = totalTicketWidth * 3;
    } else if (medium) {
        containerWidth = totalTicketWidth * 2;
    } else {
        containerWidth = tcDimensions.mobileWidth;
        desktop = false;
    }

    const ticketContainerStyle = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: desktop ? "flex-start" : "center",
        marginTop: "30px",
        width: containerWidth,
    };
    const containerStyle = {
        display: props.authLevel !== -1 ? "flex" : "none",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    };
    const ticketContainer = (
        <div style={ticketContainerStyle}>{selectedCards} </div>
    );
    const ticketsOutput =
        selectedCards.length > 0 ? ticketContainer : <NoTicketsMessage />;
    return (
        <nav style={containerStyle}>
            <TypeFilter
                types={ticketTypes}
                active={activeSection}
                setState={setActiveSection}
            />
            {ticketsOutput}
        </nav>
    );
}

export { TicketDisplayer };
