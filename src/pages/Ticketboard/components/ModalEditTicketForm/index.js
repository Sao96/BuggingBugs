import React, { createRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ticketboardFields } from "fields/ticketboardfields";
import Button from "util/Button.jsx";
import { createSelectFields, createInputFields } from "../util/InputForm";

const PushTicket = async (fieldData) => {
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
    const endpoint =
        "http://localhost:3000/createticket?pid=5edb75f55bf43e095256abad"; //subject to change
    const res = await fetch(endpoint, {
        method: "POST",
        headers: headers,
        credentials: "include",
        mode: "cors",
        cache: "no-cache",
        redirect: "follow",
        body: JSON.stringify(data),
    }); //THEN get the info to build the cards
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
    let day = String(date.getDate());
    if (month.length < 2) {
        month = "0" + month;
    }
    if (day.length < 2) {
        day = "0" + month;
    }
    return [year, month, day].join("-");
};

function ModalEditTicketForm(props) {
    const currFieldVals = useSelector((state) => {
        return state.ticketboard[ticketboardFields.NEW_TICKET_FORM_INFO];
    });

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
        PushTicketEdit(fieldData);
    }, [fieldData]);

    const mainStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    };

    return (
        <div style={mainStyle}>
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

export { ModalEditTicketForm };
