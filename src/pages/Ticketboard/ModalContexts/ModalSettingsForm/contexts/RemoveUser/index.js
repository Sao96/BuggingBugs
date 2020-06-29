import React, { useCallback, useState, createRef } from "react";
import RemoveUserIcon from "svg/removeuser.svg";
import { DefaultButton } from "buttons";
import { generateUserMap } from "util/generateUserMap";
import { useSelector } from "react-redux";
import { ticketboardFields } from "fields/ticketboardfields";
import { ResRender } from "./components";
import { postRemoveUser } from "apiCalls/BuggingBugs/POST";

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
    const pid = useSelector((state) => {
        return state.ticketboard[ticketboardFields.PID];
    });
    const originalUsers = useSelector((state) => {
        return state.ticketboard[ticketboardFields.USERS];
    });
    const [users, setUsers] = useState(originalUsers);
    const userMap = generateUserMap(users);
    const userRef = createRef();
    const usersSelectInput = createSelectFields(userMap, userRef);
    const sendUserRemoval = useCallback(() => {
        postRemoveUser({ toUid: userRef.current.value }, pid, setRes);
    }, [userRef, pid, setRes]);

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
            <DefaultButton
                onClick={sendUserRemoval}
                text={"Remove"}
                backgroundColor="green"
            />
        </div>
    );
}

export { RemoveUser };
