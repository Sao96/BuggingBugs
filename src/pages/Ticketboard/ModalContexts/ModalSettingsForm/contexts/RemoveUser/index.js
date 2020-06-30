import React, { useCallback, useState, createRef } from "react";
import RemoveUserIcon from "svg/removeuser.svg";
import { DefaultButton } from "buttons";
import { generateUserMap } from "util/generateUserMap";
import { useSelector } from "react-redux";
import { ticketboardFields as tbF } from "fields/ticketboardfields";
import { UserSelectFields } from "util/components/users";
import { SpinningLoader } from "util/components/loading";
import { ResRender } from "./components";
import { postRemoveUser } from "apiCalls/BuggingBugs/POST";

function RemoveUser(props) {
    const [res, setRes] = useState([-1, ""]);
    const [processing, setProcessing] = useState(false);
    const pid = useSelector((state) => {
        return state.ticketboard[tbF.PID];
    });
    const originalUsers = useSelector((state) => {
        return state.ticketboard[tbF.USERS];
    });
    const [users, setUsers] = useState(originalUsers);
    const userMap = generateUserMap(users);
    const userRef = createRef();
    const removeUserButtonHandler = useCallback(() => {
        postRemoveUser(
            { toUid: userRef.current.value },
            pid,
            setRes,
            setProcessing
        );
    }, [userRef, pid, setRes]);

    const headerText = "Select the user you would like to remove.";
    const svgStyle = {
        height: "130px",
        width: "130px",
        fill: "rgb(180,180,180)",
        position: "relative",
        top: "10px",
    };
    const centerBlock = {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    };
    const containerStyle = {
        display: "flex",
        flexWrap: "wrap",
        fontFamily: "didact gothic",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
    };
    return (
        <article style={containerStyle}>
            <ResRender res={res} />
            <SpinningLoader size={100} loading={processing} />
            <header style={centerBlock}>
                <RemoveUserIcon style={svgStyle} />
                {headerText}
            </header>
            <main style={centerBlock}>
                <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                    <UserSelectFields users={userMap} userRef={userRef} />
                </div>
                <DefaultButton
                    onClick={!processing ? removeUserButtonHandler : null}
                    text={"Remove"}
                    backgroundColor="green"
                />
            </main>
        </article>
    );
}

export { RemoveUser };
