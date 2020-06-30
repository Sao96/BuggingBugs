import React, { useEffect, createRef, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ticketboardFields as tbF } from "fields/ticketboardfields";
import { DefaultButton } from "buttons";
import { ticketboardActions as tbA } from "actions/ticketboardactions";
import { ModalTitle } from "util/components/modal";
import { ResRender } from "./components";
import { TicketInputFields, TicketSelectFields } from "util/components/ticket";
import { resolveRefValues } from "globalHelperFunctions/refHelpers";
import { postEditTicket } from "apiCalls/BuggingBugs/POST";
import { generateUserMap } from "util/helperFunctions/users";
import { SpinningLoader } from "util/components/loading";

function ModalEditTicketForm(props) {
    const dispatch = useDispatch();
    const [modified, setModified] = useState(false);
    const [res, setRes] = useState([-1, ""]);
    const [processing, setProcessing] = useState(false);
    const currFieldVals = useSelector((state) => {
        return state.ticketboard[tbF.NEW_TICKET_FORM_INFO];
    });
    useEffect(() => {
        return () => {
            if (modified) {
                dispatch({ type: tbA.SET_REFRESH_NEEDED });
            }
        };
    }, [modified]);
    const fieldData = {
        to: [createRef(), currFieldVals.to],
        priority: [createRef(), currFieldVals.priority],
        due: [createRef(), currFieldVals.due],
        tags: [createRef(), currFieldVals.tags],
        environment: [createRef(), currFieldVals.environment],
        headline: [createRef(), currFieldVals.headline],
        summary: [createRef(), currFieldVals.summary],
    };

    const userMap = generateUserMap(props.users);
    const editButtonHandler = useCallback(() => {
        let reqData = {};
        Object.entries(fieldData).forEach(([fieldName, fieldVal]) => {
            reqData[fieldName] = fieldVal[0];
        });
        reqData = resolveRefValues(reqData);
        reqData.tid = currFieldVals.tid;
        postEditTicket(
            reqData,
            props.pid,
            setModified,
            setRes,
            setProcessing,
            dispatch
        );
    }, [fieldData, setRes, setModified, setProcessing, dispatch]);

    const mainStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0px 70px",
    };

    return (
        <article style={mainStyle}>
            <header>
                <ModalTitle text={"Edit Ticket"} />
            </header>
            <SpinningLoader loading={processing} />
            <ResRender res={res} />
            <section>
                <TicketSelectFields fieldData={fieldData} userMap={userMap} />
                <TicketInputFields fieldData={fieldData} />
            </section>
            <DefaultButton
                text={"Edit Ticket"}
                onClick={!processing ? editButtonHandler : null}
                backgroundColor="green"
            />
        </article>
    );
}

export { ModalEditTicketForm };
