import React, { createRef, useState } from "react";
import { InputFields } from "util/components/form";
import { DefaultButton } from "buttons";

function UpdateName(props) {
    const fieldRefs = {
        firstName: createRef(),
        lastName: createRef(),
    };

    const nameInputFields = [
        ["First Name", "text", fieldRefs.firstName],
        ["Last Name", "text", fieldRefs.lastName],
    ];
    return (
        <>
            <InputFields data={nameInputFields} />
            <DefaultButton text={"Change Name"} backgroundColor={"green"} />
        </>
    );
}

export { UpdateName };
