import React, { createRef, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ticketboardFields } from "fields/ticketboardfields";
import Button from "util/Button.jsx";
import { createSelectFields, createInputFields } from "../util/InputForm";
import { domain } from "routes";
import { Redirect, useHistory } from "react-router-dom";
import { ErrorBox } from "util/ErrorBox";

const PushTicketEdit = async (fieldData, setRes, pid, tid) => {
    const data = {};
    data.tid = tid;
    for (let field in fieldData) {
        if (fieldData[field][0].current) {
            data[field] = fieldData[field][0].current.value;
        }
    }
    data.priority = Math.floor(Number(data.priority));
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const endpoint = domain + "updateticket?pid=" + pid; //subject to change
    const res = await fetch(endpoint, {
        method: "POST",
        headers: headers,
        credentials: "include",
        mode: "cors",
        cache: "no-cache",
        redirect: "follow",
        body: JSON.stringify(data),
    }); //THEN get the info to build the cards
    setRes([res.status, await res.text()]);
};

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

const ResRender = (props) => {
    const res = props.res;
    const pid = props.pid;
    switch (res[0]) {
        case 200:
            useHistory().go();
        case 300:
            return <Redirect to={"/login"} />;
        case 400:
            return <ErrorBox text={res[1]} />;
        case 500:
            return <ErrorBox text={res[1]} />;
        default:
            return <></>;
    }
};

function ModalEditTicketForm(props) {
    const currFieldVals = useSelector((state) => {
        return state.ticketboard[ticketboardFields.NEW_TICKET_FORM_INFO];
    });
    const [res, setRes] = useState([-1, ""]);
    const fieldData = {
        to: [createRef(), currFieldVals.to],
        priority: [createRef(), currFieldVals.priority],
        due: [createRef(), createHTMLDate(currFieldVals.due)],
        tags: [createRef(), currFieldVals.tags],
        environment: [createRef(), currFieldVals.environment],
        headline: [createRef(), currFieldVals.headline],
        summary: [createRef(), currFieldVals.summary],
    };
    const tid = currFieldVals.tid;

    const userMap = generateUserMap(props.users);
    const createClickHandler = useCallback(() => {
        PushTicketEdit(fieldData, setRes, props.pid, tid);
    }, [fieldData]);

    const mainStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    };

    return (
        <div style={mainStyle}>
            <ResRender res={res} pid={props.pid} />
            <div>
                {createSelectFields(fieldData, userMap)}
                {createInputFields(fieldData)}
            </div>
            <Button
                text={"Edit Ticket"}
                onClick={createClickHandler}
                backgroundColor="green"
            />
        </div>
    );
}

export { ModalEditTicketForm };
