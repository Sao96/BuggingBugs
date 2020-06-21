import React from "react";
import Open from "svg/open.svg";
import Worker from "svg/worker.svg";
import Closed from "svg/closed.svg";
import Separator from "util/separator.jsx";
import { useDispatch } from "react-redux";
import { sharedActions } from "actions/sharedactions.js";
import { ticketboardActions } from "actions/ticketboardactions";
import { ButtonHandler } from "util/buttonhandler.jsx";
const PFPImage = (image) => {
    return (
        <span style={{ paddingLeft: "10px" }}>
            <img
                style={{
                    height: "40px",
                    width: "40px",
                    borderRadius: "50%",
                    borderStyle: "solid",
                    borderColor: "black",
                    borderWidth: "1px",
                }}
                src={image}
            />
        </span>
    );
};
const Sender = (name) => {
    return (
        <span
            style={{
                position: "absolute",
                paddingTop: "10px",
                paddingLeft: "10px",
                fontSize: "19px",
                fontStyle: "italic",
                MarginBottom: "40px",
            }}
        >
            {name}
        </span>
    );
};

const HeadlineText = (text) => {
    return (
        <span
            style={{
                textAlign: "center",
                position: "absolute",
                margin: "0px 3px 0px",
            }}
        >
            {text}
        </span>
    );
};

const SizeSVG = (Comp, color = "white") => {
    return <Comp style={{ fill: color, width: "50px", height: "65px" }} />;
};

const StatusIcon = (status, priorityColor) => {
    let Comp;
    if (status == 0) Comp = Open;
    else if (status == 1) Comp = Worker;
    else Comp = Closed;
    return (
        <span style={{ position: "absolute", left: "4.5%", top: "73%" }}>
            {SizeSVG(Comp, priorityColor)}
        </span>
    );
};
const PriorityText = (text, pColor) => {
    return (
        <span
            style={{
                position: "absolute",
                left: "27%",
                top: "80.2%",
                fontStyle: "italic",
                color: "rgb(200,200,200)",
            }}
        >
            Priority:
            <span
                style={{
                    color: pColor,
                    fontSize: "21px",
                    fontStyle: "normal",
                }}
            >
                {" "}
                {text}
            </span>
        </span>
    );
};

const DueDate = (date) => {
    date = new Date(date);
    const cardDate =
        String(date.getMonth() + 1) +
        "/" +
        String(date.getDate() + 1) +
        "/" +
        String(date.getFullYear());
    return (
        <span
            style={{
                position: "absolute",
                right: "8.3%",
                top: "82.2%",
                fontStyle: "italic",
                color: "rgb(200,200,200)",
            }}
        >
            Due: {cardDate}
        </span>
    );
};

export default function Ticket(props) {
    let bgColor, priorityText, priorityColor;
    let borderColor = "black";
    switch (props.priority) {
        case 0: //max priority
            bgColor = "rgb(143, 0, 0)";
            priorityText = "MAX";
            priorityColor = "red";
            break;
        case 1:
            bgColor = "rgb(207, 80, 0)";
            priorityText = "High";
            priorityColor = "rgb(255,175,0)";
            break;
        case 2: //med priority
            bgColor = "rgb(156, 142, 0)";
            priorityText = "Med";
            priorityColor = "yellow";
            break;
        case 3:
            priorityText = "Low";
            bgColor = "rgb(38, 135, 16)";
            priorityColor = "rgb(0, 255, 22)"; //green
    }

    const containerStyle = {
        width: "360px",
        height: "230px",
        borderRadius: "10px",
        backgroundColor: bgColor,
        border: "0.5px solid " + borderColor,
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

    const dispatch = useDispatch();
    const ticketModalInfo = {
        to: props.to,
        priority: priorityText,
        due: new Date(props.due).toString(),
        tags: props.tags,
        environment: props.environment,
        headline: props.headline,
        summary: props.summary,
        tid: props._id,
    };

    const launchModalHandler = () => {
        dispatch({ type: sharedActions.PUSH_MODAL_STATE, modalState: 1 });
        dispatch({
            type: ticketboardActions.SET_DISP_TICKET_INFO,
            ticketInfo: { ...ticketModalInfo },
        });
    };
    return (
        <main style={containerStyle} onClick={launchModalHandler}>
            {PFPImage(props.pfp)}
            {Sender(props.fromName)}
            {Separator(priorityColor)}
            {HeadlineText(props.headline)}
            {StatusIcon(props.status, priorityColor)}
            {PriorityText(priorityText, priorityColor)}
            {DueDate(props.due)}
        </main>
    );
}
