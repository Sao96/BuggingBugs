import React, { createRef, useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { DefaultButton } from "buttons";
import { ticketboardActions } from "actions/ticketboardactions";
import { ModalTitle } from "util/components/modal";
import { ResRender } from "./components";
import { TicketInputFields, TicketSelectFields } from "util/components/ticket";
import { resolveRefValues } from "globalHelperFunctions/refHelpers";
import { postCreateTicket } from "apiCalls/BuggingBugs/POST";
import { generateUserMap } from "util/helperFunctions/users";
import { SpinningLoader } from "util/components/loading";

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
    const createButtonHandler = useCallback(() => {
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
            <ResRender res={res} />
            <section>
                <TicketSelectFields fieldData={fieldData} userMap={userMap} />
                <TicketInputFields fieldData={fieldData} />
            </section>
            <SpinningLoader loading={processing} />
            <DefaultButton
                text={"Create Ticket"}
                onClick={!processing ? createButtonHandler : null}
                backgroundColor="green"
            />
        </article>
    );
}

export { ModalCreateTicketForm };
