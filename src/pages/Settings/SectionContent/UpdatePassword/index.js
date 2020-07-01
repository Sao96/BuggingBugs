import React, { createRef, useState, useCallback } from "react";
import { InputFields } from "util/components/form";
import { DefaultButton } from "buttons";
import { ResRender } from "./components";
import { resolveRefValues } from "util/helperFunctions/refHelpers";
import { postUpdatePassword } from "apiCalls/BuggingBugs/POST";

function UpdatePassword(props) {
    const [res, setRes] = useState([-1, ""]);
    const [processing, setProcessing] = useState(false);
    const fieldRefs = {
        password: createRef(),
        repassword: createRef(),
    };
    const passwordInputFields = [
        ["New Password", "password", fieldRefs.password],
        ["Re-enter new password", "password", fieldRefs.repassword],
    ];
    const updatePasswordButton = useCallback(() => {
        postUpdatePassword(resolveRefValues(fieldRefs), setRes, setProcessing);
    }, [fieldRefs, setRes, setProcessing]);

    return (
        <>
            <ResRender res={res} />
            <InputFields data={passwordInputFields} />
            <DefaultButton
                onClick={updatePasswordButton}
                text={"Change Password"}
                backgroundColor={"green"}
            />
        </>
    );
}

export { UpdatePassword };
