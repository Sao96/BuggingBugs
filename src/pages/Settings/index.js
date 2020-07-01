import React, { createRef, useState } from "react";
import { SectionLayout } from "./components";
import { Overview, UpdateName, UpdatePassword } from "./SectionContent";

function Settings(props) {
    const containerStyle = {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        color: "white",
    };
    const formSections = [
        ["Overview", "", <Overview />],
        ["Update Name", "", <UpdateName />],
        [
            "Update Password",
            "This option is only available for users who registered directly with BuggingBugs, rathern than a service like google.",
            <UpdatePassword />,
        ],
    ].map((sectionData, idx) => {
        return (
            <SectionLayout
                key={idx}
                title={sectionData[0]}
                informationText={sectionData[1]}
            >
                {sectionData[2]}
            </SectionLayout>
        );
    });
    const formDimensions = { width: "800px" };
    let mainStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "rgb(67, 118, 148)",
        border: "rgb(37, 88, 118) 0.5px solid",
        color: "white",
        fontFamily: "Didact Gothic",
        paddingTop: "50px",
    };
    mainStyle = { ...mainStyle, ...formDimensions };
    return (
        <div style={containerStyle}>
            <main style={mainStyle}>{formSections}</main>
        </div>
    );
}

export { Settings };
