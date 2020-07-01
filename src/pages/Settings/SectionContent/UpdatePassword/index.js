import React, { createRef, useState } from "react";
import { InputFields } from "util/components/form";
import { DefaultButton } from "buttons";

function UpdatePassword(props) {
    const fieldRefs = {
        password: createRef(),
        repassword: createRef(),
    };

    const passwordInputFields = [
        ["New Password", "password", fieldRefs.password],
        ["Re-enter new password", "password", fieldRefs.repassword],
    ];
    return (
        <>
            <InputFields data={passwordInputFields} />
            <DefaultButton text={"Change Password"} backgroundColor={"green"} />
        </>
    );
}

export { UpdatePassword };
