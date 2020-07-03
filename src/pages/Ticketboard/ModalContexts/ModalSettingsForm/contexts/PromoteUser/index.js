import React, { useCallback, useState, createRef } from "react";
import PromoteUserIcon from "svg/userpromotion.svg";
import { DefaultButton } from "buttons";
import { generateUserMap } from "util/generateUserMap";
import { useSelector } from "react-redux";
import { ticketboardFields } from "fields/ticketboardfields";
import { UserSelectFields } from "util/components/users";
import { SpinningLoader } from "util/components/loading";
import { ResRender } from "./components";
import { contextStyles } from "styles";
import { postUserPromotion } from "apiCalls/BuggingBugs/POST";
import { ModalTitle } from "util/components/modal";

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

    const headerText = "Select the user you would like to promote.";

    return (
        <article style={contextStyles.containerStyle}>
            <ResRender res={res} pid={props.pid} />
            <SpinningLoader size={100} loading={processing} />
            <header style={contextStyles.centerBlock}>
                <ModalTitle text={"Promote User"} />
                <PromoteUserIcon style={contextStyles.svgStyle} />
                <div style={contextStyles.headerTextStyle}>{headerText}</div>
            </header>
            <main style={contextStyles.centerBlock}>
                <section style={{ marginTop: "10px" }}>
                    <UserSelectFields users={userMap} userRef={userRef} />
                </section>
                <div style={contextStyles.buttonSpace}>
                    <DefaultButton
                        onClick={!processing ? promoteUserButton : null}
                        text={"Promote"}
                        backgroundColor="green"
                    />
                </div>
            </main>
        </article>
    );
}

export { PromoteUser };
