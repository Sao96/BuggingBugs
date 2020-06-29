import React, { useEffect, createRef, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ticketboardFields } from "fields/ticketboardfields";
import { DefaultButton } from "buttons";
import { createSelectFields, createInputFields } from "util/components/ticket";
// import { ModalTitle } from "util/ModalTitle";
import { ticketboardActions } from "actions/ticketboardactions";
import { postEditTicket } from "apiCalls/BuggingBugs/POST";
import { ModalTitle } from "util/components/modal";
import { ResRender } from "./components";
import { TicketInputFields, TicketSelectFields } from "util/components/ticket";
import { resolveRefValues } from "globalHelperFunctions/refHelpers";

//maps uid with name.
const generateUserMap = (users) => {
    const userMap = [];
    for (let user in users) {
        userMap.push([user, users[user].name]);
    }
    return userMap;
};

const createHTMLDate = (date) => {
    date = new Date(date);
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1);
    let day = String(date.getDate() + 1);
    if (month.length < 2) {
        month = "0" + month;
    }
    if (day.length < 2) {
        day = "0" + month;
    }
    return [year, month, day].join("-");
};

function ModalEditTicketForm(props) {
    const dispatch = useDispatch();
    const [modified, setModified] = useState(false);
    const [res, setRes] = useState([-1, ""]);
    const [processing, setProcessing] = useState(false);
    const currFieldVals = useSelector((state) => {
        return state.ticketboard[ticketboardFields.NEW_TICKET_FORM_INFO];
    });
    useEffect(() => {
        return () => {
            if (modified) {
                dispatch({ type: ticketboardActions.SET_REFRESH_NEEDED });
            }
        };
    }, [modified]);
    const fieldData = {
        to: [createRef(), currFieldVals.to],
        priority: [createRef(), currFieldVals.priority],
        due: [createRef(), createHTMLDate(currFieldVals.due)],
        tags: [createRef(), currFieldVals.tags],
        environment: [createRef(), currFieldVals.environment],
        headline: [createRef(), currFieldVals.headline],
        summary: [createRef(), currFieldVals.summary],
    };

    const userMap = generateUserMap(props.users);
    const createClickHandler = useCallback(() => {
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
        <div style={mainStyle}>
            <ModalTitle text={"Edit Ticket"} />
            <ResRender res={res} pid={props.pid} />
            <div>
                <TicketSelectFields fieldData={fieldData} userMap={userMap} />
                <TicketInputFields fieldData={fieldData} />
            </div>
            <DefaultButton
                text={"Edit Ticket"}
                onClick={createClickHandler}
                backgroundColor="green"
            />
        </div>
    );
}

export { ModalEditTicketForm };
