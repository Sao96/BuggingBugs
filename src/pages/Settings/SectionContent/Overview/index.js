import React, { createRef, useState } from "react";
import { InputFields } from "util/components/form";
import { DefaultButton } from "buttons";
import { useSelector } from "react-redux";
import { sharedFields } from "fields/sharedfields";
import { useDesktop } from "util/responsive";

function PictureNameSection(props) {
    const containerStyle = {
        display: "flex",
        flexDirection: "column",
    };
    const nameStyle = {
        fontSize: "24px",
    };
    const imageStyle = {
        height: "150px",
        width: "150px",
    };

    return (
        <section style={containerStyle}>
            <img style={imageStyle} src={props.pfp} />
            <span style={{ marginBottom: "10px" }} />
            <div style={nameStyle}>{props.name}</div>
        </section>
    );
}

function IdSection(props) {
    const inputFocusHandler = (event) => event.target.select();
    const inputStyle = {
        height: "24px",
        width: "230px",
        fontFamily: "Didact Gothic",
        fontSize: "18px",
        resize: "none",
        backgroundColor: "rgb(100,100,100)",
        color: "rgb(240,240,240)",
        overflow: "hidden",
        border: "1px solid rgb(50,50,50)",
    };
    const labelStyle = {
        fontSize: "20px",
    };
    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    };

    const items = [
        ["Email", props.email],
        ["BuggingBugs ID", props.uid],
    ].map(([fieldName, fieldValue], idx) => {
        return (
            <div key={idx} style={{ display: "flex", flexDirection: "column" }}>
                <label style={labelStyle}>{fieldName}</label>
                <span style={{ marginBottom: "5px" }} />
                <input
                    style={inputStyle}
                    type="text"
                    onFocus={inputFocusHandler}
                    readOnly
                    value={fieldValue}
                />
                <span style={{ marginBottom: "20px" }} />
            </div>
        );
    });
    return <section style={containerStyle}>{items}</section>;
}

function Overview(props) {
    const desktop = useDesktop();

    const userData = useSelector((state) => {
        return state.shared[sharedFields.USER_DATA];
    });
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
            <section
                style={{
                    display: "flex",
                    flexDirection: desktop ? "row" : "column",
                    alignItems: "center",
                    width: "73%",
                    justifyContent: "space-between",
                }}
            >
                <PictureNameSection pfp={userData.pfp} name={userData.name} />
                <IdSection email={userData.email} uid={userData.uid} />
            </section>
        </>
    );
}

export { Overview };
