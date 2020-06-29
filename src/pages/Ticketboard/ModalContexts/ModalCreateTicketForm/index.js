import React, { createRef, useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DefaultButton } from "buttons";
import { createSelectFields, createInputFields } from "util/components/ticket";
// import { ModalTitle } from "util/ModalTitle";
import { ticketboardActions } from "actions/ticketboardactions";
// import { sharedActions } from "actions/sharedactions";
import { ModalTitle } from "util/components/modal";
import { ResRender } from "./components";
import { TicketInputFields, TicketSelectFields } from "util/components/ticket";
import { resolveRefValues } from "globalHelperFunctions/refHelpers";
import { postCreateTicket } from "apiCalls/BuggingBugs/POST";
const generateUserMap = (users) => {
    const userMap = [];
    for (let user in users) {
        userMap.push([user, users[user].name]);
    }
    return userMap;
};

function ModalCreateTicketForm(props) {
    const dispatch = useDispatch();
    const [res, setRes] = useState([-1, ""]);
    const [processing, setProcessing] = useState(false);
    const [modified, setModified] = useState(false);
    useEffect(() => {
        return () => {
            if (modified) {
                dispatch({ type: ticketboardActions.SET_REFRESH_NEEDED });
            }
        };
    }, [modified]);
    const fieldData = {
        to: [createRef(), ""],
        priority: [createRef(), "0"],
        due: [createRef(), ""],
        tags: [createRef(), ""],
        environment: [createRef(), ""],
        headline: [createRef(), ""],
        summary: [createRef(), ""],
    };
    const userMap = generateUserMap(props.users);
    const createClickHandler = useCallback(() => {
        const refs = {};
        Object.entries(fieldData).forEach(([fieldName, fieldVal]) => {
            refs[fieldName] = fieldVal[0];
        });
        postCreateTicket(
            resolveRefValues(refs),
            props.pid,
            setModified,
            setRes,
            setProcessing,
            dispatch
        );
    }, [fieldData, setModified, setRes, setProcessing, dispatch]);
    const titleStyle = {
        fontFamily: "Didact Gothic",
        fontSize: "36px",
        marginBottom: "35px",
        color: "rgb(240, 240, 240)",
    };
    const mainStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0px 70px",
    };

    return (
        <article style={mainStyle}>
            <header>
                <ModalTitle text={"New Ticket"} />
            </header>
            <ResRender res={res} pid={props.pid} />
            <section>
                <TicketSelectFields fieldData={fieldData} userMap={userMap} />
                <TicketInputFields fieldData={fieldData} />
            </section>
            <DefaultButton
                text={"Create Ticket"}
                onClick={createClickHandler}
                backgroundColor="green"
            />
        </article>
    );
}

export { ModalCreateTicketForm };
