import React, { useCallback, useState, createRef } from "react";
import { domain } from "routes";
import { useHistory, Redirect } from "react-router";
import { ErrorBox } from "util/ErrorBox";
import RemoveUserIcon from "svg/removeuser.svg";
import Button from "util/Button.jsx";
import { generateUserMap } from "util/generateUserMap";
import { useSelector } from "react-redux";
import { ticketboardFields } from "fields/ticketboardfields";

async function PushUserRemove(toUid, setRes, pid) {
    const data = {
        to: toUid,
    };

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const endpoint = domain + "createinvite?pid=" + pid; //subject to change
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
    setRes([resStatus, resData]);
}

const ResRender = (props) => {
    const res = props.res;
    const pid = props.pid;
    switch (res[0]) {
        case 200:
            useHistory().go(); //say invite sent or something
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

const createSelectFields = (users, userRef) => {
    const selectStyle = {
        height: "35px",
        width: "200px",
        backgroundColor: "rgb(10, 25, 45)",
        color: "white",
        fontSize: "20px",
        fontFamily: "Didact Gothic",
    };

    return (
        <select ref={userRef} style={selectStyle}>
            {users.map((userData) => {
                return <option value={userData[0]}>{userData[1]}</option>;
            })}
        </select>
    );
};

function RemoveUser(props) {
    const [res, setRes] = useState([-1, ""]);
    const originalUsers = useSelector((state) => {
        return state.ticketboard[ticketboardFields.USERS];
    });
    const [users, setUsers] = useState(originalUsers);
    const userMap = generateUserMap(users);
    const userRef = createRef();
    const usersSelectInput = createSelectFields(userMap, userRef);
    const sendUserRemoval = useCallback(() => {
        PushUserRemove(userRef.current.value, setRes, props.pid);
    }, [userRef]);

    const svgStyle = {
        height: "130px",
        width: "130px",
        fill: "rgb(180,180,180)",
        position: "relative",
        top: "10px",
    };
    const mainStyle = {
        display: "flex",
        flexWrap: "wrap",
        fontFamily: "didact gothic",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
    };
    return (
        <div style={mainStyle}>
            <ResRender res={res} pid={props.pid} />
            <RemoveUserIcon style={svgStyle} />
            Select the user you would like to remove.
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                {usersSelectInput}
            </div>
            <Button
                onClick={sendUserRemoval}
                text={"Remove"}
                backgroundColor="green"
            />
        </div>
    );
}

export { RemoveUser };
