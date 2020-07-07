import React from "react";
import { FeatureListing } from "./components/";
import SimpleIcon from "svg/simple.svg";
import CycleIcon from "svg/cycle.svg";
import JuggleIcon from "svg/juggle.svg";

function InfoSection(props) {
    const listings = [
        [
            JuggleIcon,
            "One for all.",
            "Keep track of bugs across all projects from just one platform.",
        ],
        [
            CycleIcon,
            "Natural life cycle.",
            "Bug reports naturally manage state on their own, from finding to resolving.",
        ],
        [
            SimpleIcon,
            "Simple to use.",
            "Experience a smooth and predictable system. Managing complex problems should be as simple as possible.",
        ],
    ].map((listing, idx) => {
        return (
            <section key={idx}>
                <FeatureListing
                    svg={listing[0]}
                    title={listing[1]}
                    mainText={listing[2]}
                />
                <span style={{ marginBottom: "10px" }} />
            </section>
        );
    });
    const headerText =
        "Make keeping track of bugs across multiple projects simple.";
    const containerStyle = {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        color: "black",
        width: props.useDesktop ? "1000px" : "300px",
    };
    const headerStyle = {
        fontSize: "30px",
        fontFamily: "Montserrat",
        color: "rgb(50,50,50)",
        textAlign: "center",
        marginTop: "20px",
        marginBottom: "70px",
    };
    const featuresContainerStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: props.useDesktop ? "row" : "column",
    };
    return (
        <section style={containerStyle}>
            <header style={headerStyle}>{headerText}</header>
            <div style={featuresContainerStyle}>{listings}</div>
        </section>
    );
}

export { InfoSection };
