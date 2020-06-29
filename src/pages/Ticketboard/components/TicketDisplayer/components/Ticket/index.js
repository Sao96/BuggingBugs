import React from "react";
import { useDispatch } from "react-redux";
import { sharedActions } from "actions/sharedactions.js";
import { ticketboardActions } from "actions/ticketboardactions";
import {
    PFPImage,
    Sender,
    Separator,
    HeadlineText,
    StatusIcon,
    PriorityText,
    DueDate,
} from "./components";
import { priorityInformationMap } from "util/helperFunctions/ticketHelpers";

function Ticket(props) {
    const dispatch = useDispatch();

    const [priorityText, bgColor, priorityColor] = priorityInformationMap(
        props.priority
    );
    props.priority;
    const launchModalHandler = () => {
        dispatch({ type: sharedActions.PUSH_MODAL_STATE, modalState: 1 });
        dispatch({
            type: ticketboardActions.SET_DISP_TICKET_INFO,
            ticketInfo: { ...ticketModalInfo },
        });
    };

    const ticketModalInfo = {
        fromPfp: props.fromPfp,
        fromName: props.fromName,
        to: props.to,
        priority: priorityText,
        due: new Date(props.due).toString(),
        tags: props.tags,
        environment: props.environment,
        headline: props.headline,
        summary: props.summary,
        tid: props._id,
        status: props.status,
    };
    const containerStyle = {
        width: "360px",
        height: "230px",
        borderRadius: "10px",
        backgroundColor: bgColor,
        border: "0.5px solid black",
        color: "white",
        marginBottom: "70px",
        marginRight: "50px",
        padding: "4px 0px 0px 2px",
        boxShadow: "2px 4px 4px 0px rgba(0,0,0,0.75)",
        fontFamily: "Didact Gothic, Quattrocento Sans",
        fontSize: "18px",
        position: "relative",
        cursor: "pointer",
        userSelect: "none",
    };

    return (
        <article style={containerStyle} onClick={launchModalHandler}>
            <PFPImage image={props.cardPfp} />
            <Sender name={props.cardName} />
            <Separator color={priorityColor} />
            <HeadlineText text={props.headline} />
            <StatusIcon status={props.status} priorityColor={priorityColor} />
            <PriorityText text={priorityText} color={priorityColor} />
            <DueDate date={props.due} />
        </article>
    );
}

export { Ticket };
