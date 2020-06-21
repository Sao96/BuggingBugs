import React, { createRef, useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import Button from "util/Button.jsx";
import { createSelectFields, createInputFields } from "../util/InputForm";
import { domain } from "routes";
import { ErrorBox } from "util/ErrorBox";
import { ModalTitle } from "util/ModalTitle";
import { ticketboardActions } from "actions/ticketboardactions";
import { sharedActions } from "actions/sharedactions";

const PushTicket = async (fieldData, setRes, pid, setModified, dispatch) => {
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
    const endpoint = domain + "createticket?pid=" + pid;
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

function ModalCreateTicketForm(props) {
    const dispatch = useDispatch();
    const [res, setRes] = useState([-1, ""]);
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
        PushTicket(fieldData, setRes, props.pid, setModified, dispatch);
    }, [fieldData, modified]);
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
        <div style={mainStyle}>
            <ModalTitle text={"New Ticket"} />
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
