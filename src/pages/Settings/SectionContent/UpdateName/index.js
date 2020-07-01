import React, { createRef, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { InputFields } from "util/components/form";
import { resolveRefValues } from "util/helperFunctions/refHelpers";
import { DefaultButton } from "buttons";
import { ResRender } from "./components";
import { postUpdateName } from "apiCalls/BuggingBugs/POST";

function UpdateName(props) {
    const dispatch = useDispatch();
    const [res, setRes] = useState([-1, ""]);
    const [processing, setProcessing] = useState(false);
    const fieldRefs = {
        firstName: createRef(),
        lastName: createRef(),
    };
    const nameInputFields = [
        ["First Name", "text", fieldRefs.firstName],
        ["Last Name", "text", fieldRefs.lastName],
    ];
    const updateNameButtonHandler = useCallback(() => {
        postUpdateName(
            resolveRefValues(fieldRefs),
            setRes,
            setProcessing,
            dispatch
        );
    }, [fieldRefs, setRes, setProcessing, dispatch]);

    return (
        <>
            <ResRender res={res} />
            <InputFields data={nameInputFields} />
            <DefaultButton
                onClick={updateNameButtonHandler}
                text={"Change Name"}
                backgroundColor={"green"}
            />
        </>
    );
}

export { UpdateName };
