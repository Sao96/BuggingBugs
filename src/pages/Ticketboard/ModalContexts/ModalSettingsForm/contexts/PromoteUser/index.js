import React, { useCallback, useState, createRef } from "react";
import PromoteUserIcon from "svg/userpromotion.svg";
import { DefaultButton } from "buttons";
import { generateUserMap } from "util/generateUserMap";
import { useSelector } from "react-redux";
import { ticketboardFields } from "fields/ticketboardfields";
import { UserSelectFields } from "util/components/users";
import { SpinningLoader } from "util/components/loading";
import { ResRender } from "./components";
import { postUserPromotion } from "apiCalls/BuggingBugs/POST";

function PromoteUser(props) {
    const [res, setRes] = useState([-1, ""]);
    const [processing, setProcessing] = useState(false);
    const pid = useSelector((state) => {
        return state.ticketboard[ticketboardFields.PID];
    });
    const originalUsers = useSelector((state) => {
        return state.ticketboard[ticketboardFields.USERS];
    });
    const [users, setUsers] = useState(originalUsers);
    const userMap = generateUserMap(users);
    const userRef = createRef();
    const promoteUserButton = useCallback(() => {
        postUserPromotion(
            { to: userRef.current.value },
            pid,
            setRes,
            setProcessing
        );
    }, [userRef]);

    const headerText = "Select the user you would like to promote to leader.";
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
            <ResRender res={res} pid={props.pid} />
            <SpinningLoader size={100} loading={processing} />
            <header style={centerBlock}>
                <PromoteUserIcon style={svgStyle} />
                {headerText}
            </header>
            <main style={centerBlock}>
                <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                    <UserSelectFields users={userMap} userRef={userRef} />
                </div>
                <DefaultButton
                    onClick={!processing ? promoteUserButton : null}
                    text={"Promote"}
                    backgroundColor="green"
                />
            </main>
        </article>
    );
}

export { PromoteUser };
