import React, { useCallback, useState, createRef } from "react";
import PromoteUserIcon from "svg/userpromotion.svg";
import { DefaultButton } from "buttons";
import { generateUserMap } from "util/generateUserMap";
import { useSelector } from "react-redux";
import { ticketboardFields } from "fields/ticketboardfields";
import { postUserPromotion } from "apiCalls/BuggingBugs/POST";
import { ResRender } from "./components";

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

function PromoteUser(props) {
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
    const sendUserPromotion = useCallback(() => {
        postUserPromotion({ to: userRef.current.value }, pid, setRes);
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
            <ResRender res={res} />
            <PromoteUserIcon style={svgStyle} />
            <div>Select the user you would like to promote to leader.</div>
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                {usersSelectInput}
            </div>
            <DefaultButton
                onClick={sendUserPromotion}
                text={"Promote"}
                backgroundColor="green"
            />
        </div>
    );
}

export { PromoteUser };
