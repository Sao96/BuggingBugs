import React from "react";
import { TextButton } from "buttons";

function EditDeleteButtons(props) {
    const authLevel = props.authLevel;
    const containerStyle = {
        display: authLevel === 0 ? "flex" : "none",
        justifyContent: "space-around",
        width: "50%",
        fontSize: "18px",
        fontFamily: "Didact Gothic",
        marginBottom: "2px",
    };
    return (
        <section style={containerStyle}>
            <TextButton
                text={"Edit"}
                onClick={!props.disable ? props.editHandler : null}
            />
            <TextButton
                text={"Delete"}
                onClick={!props.disable ? props.deleteHanlder : null}
            />
        </section>
    );
}

export { EditDeleteButtons };
