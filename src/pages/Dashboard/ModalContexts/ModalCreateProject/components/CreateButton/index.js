import React from "react";
import { DefaultButton } from "buttons";
import ClipLoader from "react-spinners/ClipLoader";

function CreateButton(props) {
    if (!props.processing) {
        return (
            <DefaultButton
                onClick={props.onClick}
                text={"Create"}
                backgroundColor="green"
            />
        );
    }
    return <ClipLoader size={150} color={"rgb(200,200,200)"} loading={true} />;
}

export { CreateButton };
