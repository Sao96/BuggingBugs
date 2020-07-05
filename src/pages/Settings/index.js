import React, { useEffect, createRef, useState } from "react";
import { useDispatch } from "react-redux";
import { sharedActions as sA } from "actions/sharedactions";
import { SectionLayout } from "./components";
import {
    Overview,
    UpdateName,
    UpdatePfp,
    UpdatePassword,
} from "./SectionContent";

function Settings(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: sA.TOGGLE_NAV });
        return () => {
            dispatch({ type: sA.TOGGLE_NAV });
        };
    }, []);
    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        color: "white",
    };

    const formSections = [
        ["Overview", "", <Overview />],
        ["Update Profile Picture", "", <UpdatePfp />],
        ["Update Name", "", <UpdateName />],
        [
            "Update Password",
            "Only available for users who registered directly with BuggingBugs, rather than a service like google.",
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
