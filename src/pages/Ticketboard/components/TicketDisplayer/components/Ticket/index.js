import React from "react";
import { ticketCardStyles as tcStyles } from "styles";
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
import { useDesktop } from "util/responsive";

function Ticket(props) {
    const desktop = useDesktop();
    const dispatch = useDispatch();
    const [priorityText, bgColor, priorityColor] = priorityInformationMap(
        props.priority
    );
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
        priority: props.priority,
        due: props.due,
        tags: props.tags,
        environment: props.environment,
        headline: props.headline,
        summary: props.summary,
        tid: props._id,
        status: props.status,
    };
    const [ticketWidth, ticketHeight] = desktop
        ? [tcStyles.dimensions.width, tcStyles.dimensions.height]
        : [tcStyles.dimensions.mobileWidth, tcStyles.dimensions.mobileHeight];
    const containerStyle = {
        width: ticketWidth + "px",
        height: ticketHeight + "px",
        borderRadius: "10px",
        backgroundColor: bgColor,
        border: "1px solid black",
        color: "white",
        marginBottom: "70px",
        marginRight: (desktop ? tcStyles.dimensions.marginRight : 0) + "px",
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
            <PFPImage image={props.cardPfp} priorityColor={priorityColor} />
            <Sender name={props.cardName} />
            <Separator color={priorityColor} />
            <HeadlineText text={props.headline} />
            <StatusIcon status={props.status} priorityColor={priorityColor} />
            <PriorityText
                desktop={desktop}
                text={priorityText}
                color={priorityColor}
            />
            <DueDate date={props.due} />
        </article>
    );
}

export { Ticket };
