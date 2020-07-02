import React, { createRef, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { InputFields } from "util/components/form";
import { resolveRefValues } from "util/helperFunctions/refHelpers";
import { DefaultButton } from "buttons";
import { ResRender } from "./components";
import { postUpdatePfp } from "apiCalls/BuggingBugs/POST";
import { SpinningLoader } from "util/components/loading";

function UpdatePfp(props) {
    const dispatch = useDispatch();
    const [res, setRes] = useState([-1, ""]);
    const [processing, setProcessing] = useState(false);
    const fieldRefs = {
        pfp: createRef(),
    };
    const nameInputFields = [["Image URL", "text", fieldRefs.pfp]];
    const updateNameButtonHandler = useCallback(() => {
        postUpdatePfp(
            resolveRefValues(fieldRefs),
            setRes,
            setProcessing,
            dispatch
        );
    }, [fieldRefs, setRes, setProcessing, dispatch]);

    return (
        <>
            <ResRender res={res} />
            <SpinningLoader loading={processing} />
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
