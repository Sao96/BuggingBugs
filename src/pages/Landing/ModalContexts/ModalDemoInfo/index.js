import React, { useEffect } from "react";
import { ModalTitle } from "util/components/modal";
import { DefaultButton } from "buttons";
import { useDispatch } from "react-redux";
import { sharedActions as sA } from "actions/sharedactions";

function ModalDemoInfo(props) {
    const dispatch = useDispatch();
    const understoodButtonHandler = () => {
        dispatch({ type: sA.PUSH_MODAL_STATE, modalState: 2 });
    };
    const containerStyle = {
        width: "500px",
        color: "white",
        display: "flex",
        flexFlow: "column wrap",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(68, 120, 150)",
        paddingTop: "10px",
        paddingBottom: "30px",
    };
    const textSectionStyle = {
        color: "white",
        fontFamily: "Didact Gothic",
        fontSize: "19px",
        width: "350px",
        paddingBottom: "20px",
    };
    return (
        <article style={containerStyle}>
            <ModalTitle text={"BuggingBugs Demo"} />
            <span
                style={{
                    marginTop: "30px",
                }}
            />
            <main>
                <section style={textSectionStyle}>
                    Hello, and thank you for your interest in trying
                    BuggingBugs!
                    <br />
                    <br />
                    All functionality except inviting users to groups is
                    available in the demo version.
                    <br />
                    <br />
                    After 60 minutes, the demo session will automatically
                    expire. You can always start another through this menu!
                </section>
            </main>
            <span style={{ marginTop: "30px" }} />
            <DefaultButton
                onClick={understoodButtonHandler}
                text={"Understood"}
                backgroundColor={"green"}
            />
        </article>
    );
}

export { ModalDemoInfo };
