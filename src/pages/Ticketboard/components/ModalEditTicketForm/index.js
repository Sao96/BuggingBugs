import React, { useEffect, createRef, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ticketboardFields } from "fields/ticketboardfields";
import Button from "util/Button.jsx";
import { createSelectFields, createInputFields } from "../util/InputForm";
import { domain } from "routes";
import { Redirect, useHistory } from "react-router-dom";
import { ErrorBox } from "util/ErrorBox";
import { ModalTitle } from "util/ModalTitle";
import { ticketboardActions } from "actions/ticketboardactions";
import { sharedActions } from "actions/sharedactions";

const PushTicketEdit = async (
    fieldData,
    setRes,
    pid,
    tid,
    setModified,
    dispatch
) => {
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
    });
    const resStatus = res.status,
        resData = await res.json();
    if (resStatus === 200) {
        dispatch({
            type: ticketboardActions.UPDATE_DISP_TICKET_INFO,
            data: data,
        });
        setModified(true);
        dispatch({ type: sharedActions.POP_MODAL_STATE });
    } else {
        setRes([resData, resStatus]);
    }
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
    switch (res[0]) {
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
    const dispatch = useDispatch();
    const [modified, setModified] = useState(false);
    const [res, setRes] = useState([-1, ""]);
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
    const tid = currFieldVals.tid;

    const userMap = generateUserMap(props.users);
    const createClickHandler = useCallback(() => {
        PushTicketEdit(
            fieldData,
            setRes,
            props.pid,
            tid,
            setModified,
            dispatch
        );
    }, [fieldData, dispatch, setModified]);

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
