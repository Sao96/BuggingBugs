import React, { useCallback, useState, createRef } from "react";
import RemoveUserIcon from "svg/removeuser.svg";
import { DefaultButton } from "buttons";
import { generateUserMap } from "util/generateUserMap";
import { useSelector } from "react-redux";
import { ticketboardFields as tbF } from "fields/ticketboardfields";
import { UserSelectFields } from "util/components/users";
import { SpinningLoader } from "util/components/loading";
import { ResRender } from "./components";
import { contextStyles } from "styles";
import { postRemoveUser } from "apiCalls/BuggingBugs/POST";
import { ModalTitle } from "util/components/modal";

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
            { to: userRef.current.value },
            pid,
            setRes,
            setProcessing
        );
    }, [userRef, pid, setRes]);

    const headerText = "Select the user you would like to remove.";

    return (
        <article style={contextStyles.containerStyle}>
            <ResRender res={res} />
            <SpinningLoader size={100} loading={processing} />
            <header style={contextStyles.centerBlock}>
                <ModalTitle text={"Rename Project"} />
                <RemoveUserIcon style={contextStyles.svgStyle} />
                <div style={contextStyles.headerTextStyle}>{headerText}</div>
            </header>
            <main style={contextStyles.centerBlock}>
                <section style={{ marginTop: "10px" }}>
                    <UserSelectFields users={userMap} userRef={userRef} />
                </section>
                <div style={contextStyles.buttonSpace}>
                    <DefaultButton
                        onClick={!processing ? removeUserButtonHandler : null}
                        text={"Remove"}
                        backgroundColor="green"
                    />
                </div>
            </main>
        </article>
    );
}

export { RemoveUser };
