import React, { createRef, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router";
import { ticketboardFields } from "fields/ticketboardfields";
import Button from "util/Button.jsx";
import { createSelectFields, createInputFields } from "../util/InputForm";
import { domain } from "routes";

const PushTicket = async (fieldData, setRes, pid) => {
    const data = {};
    for (let field in fieldData) {
        if (fieldData[field][0].current) {
            data[field] = fieldData[field][0].current.value;
        }
    }
    data.priority = Math.floor(Number(data.priority));
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const endpoint = domain + "createticket?pid=" + pid; //subject to change
    const res = await fetch(endpoint, {
        method: "POST",
        headers: headers,
        credentials: "include",
        mode: "cors",
        cache: "no-cache",
        redirect: "follow",
        body: JSON.stringify(data),
    });
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

function ModalCreateTicketForm(props) {
    const [res, setRes] = useState([-1, ""]);
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
        PushTicket(fieldData, setRes, props.pid);
    }, [props.fieldRefs]);
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
                text={"Create Ticket"}
                onClick={createClickHandler}
                backgroundColor="green"
            />
        </div>
    );
}

export { ModalCreateTicketForm };

// const currFieldVals = [];

// const currFieldVals = useSelector((state) => {
//     return state.ticketboard[ticketboardFields.NEW_TICKET_FORM_INFO];
// });
