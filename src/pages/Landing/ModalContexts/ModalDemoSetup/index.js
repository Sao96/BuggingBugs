import React, { useState, createRef, useCallback } from "react";
import { ModalTitle } from "util/components/modal";
import { DefaultButton } from "buttons";
import { resolveRefValues } from "util/helperFunctions/refHelpers";
import { useDispatch } from "react-redux";
import { InputFields } from "util/components/form";
import { ResRender } from "./components";
import { postCreateDemo } from "apiCalls/BuggingBugs/POST";

function ModalDemoSetup(props) {
    const dispatch = useDispatch();
    const [res, setRes] = useState([-1, ""]);
    const [processing, setProcessing] = useState(false);
    const fieldRefs = {
        firstName: createRef(),
        lastName: createRef(),
        pfp: createRef(),
    };
    const startButtonHandler = useCallback(() => {
        postCreateDemo(
            resolveRefValues(fieldRefs),
            setRes,
            setProcessing,
            dispatch
        );
    }, [fieldRefs, setRes, setProcessing, dispatch]);

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
    const formSectionStyle = {
        color: "white",
        fontFamily: "Didact Gothic",
        fontSize: "19px",
        width: "350px",
        paddingBottom: "20px",
    };
    const formFields = [
        ["First Name", "input", fieldRefs.firstName],
        ["Last Name", "input", fieldRefs.lastName],
        ["Profile Picture URL (Optional)", "input", fieldRefs.pfp],
    ];

    return (
        <article style={containerStyle}>
            <ModalTitle text={"Demo Profile"} />
            <ResRender res={res} processing={processing} dispatch={dispatch} />
            <main>
                <section style={formSectionStyle}>
                    <InputFields data={formFields} />
                </section>
                <span style={{ marginTop: "30px" }} />
            </main>
            <DefaultButton
                onClick={startButtonHandler}
                text={"Start Demo"}
                backgroundColor={"green"}
            />
        </article>
    );
}

export { ModalDemoSetup };
