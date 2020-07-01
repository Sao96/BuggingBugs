import React, { createRef, useState } from "react";
import { InputFields } from "util/components/form";
import { DefaultButton } from "buttons";

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
            <img
                style={imageStyle}
                src="https://cdn.discordapp.com/attachments/726840292128587935/727904173999390721/689606412644515853.png"
            />
            <span style={{ marginBottom: "10px" }} />
            <div style={nameStyle}>Shadi Othman</div>
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
        ["Email", "BuggingBugstest1@gmail.com"],
        ["BuggingBugs ID", "5ee56576c81d5d40d08463b2"],
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
                    width: "73%",
                    justifyContent: "space-between",
                }}
            >
                <PictureNameSection />
                <IdSection />
            </section>
        </>
    );
}

export { Overview };
