import React, { createRef, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { InputFields } from "util/components/form";
import { resolveRefValues } from "util/helperFunctions/refHelpers";
import { DefaultButton } from "buttons";
import { ResRender } from "./components";
import { postUpdatePfp } from "apiCalls/BuggingBugs/POST";

function UpdatePfp(props) {
    const dispatch = useDispatch();
    const [res, setRes] = useState([-1, ""]);
    const [processing, setProcessing] = useState(false);
    const fieldRefs = {
        image: createRef(),
    };
    const nameInputFields = [["Image URL", "text", fieldRefs.image]];
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
                text={"Change Picture"}
                backgroundColor={"green"}
            />
        </>
    );
}

export { UpdatePfp };
