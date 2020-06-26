import React, { useEffect, createRef, useCallback } from "react";
import SimpleIcon from "svg/simple.svg";
import CycleIcon from "svg/cycle.svg";
import JuggleIcon from "svg/juggle.svg";
import { HookSection } from "./components/HookSection"

function FeatureListing(props) {
    const Svg = props.svg;
    const title = props.title;
    const mainText = props.mainText;
    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // justifyContent: "flex-start",
        width: "33.3%",
        height: "500px",
        paddingRight: "50px",
    };

    const titleStyle = {
        fontSize: "30px",
        fontFamily: "Montserrat",
        color: "rgb(50,50,50)",
        marginBottom: "8px",
        textAlign: "center",
    };
    const mainStyle = {
        fontSize: "20px",
        fontFamily: "Montserrat",
        color: "rgb(70,70,70)",
        textAlign: "center",
    };
    return (
        <section style={containerStyle}>
            {Svg}
            <div style={titleStyle}>{title}</div>
            <main style={mainStyle}>{mainText}</main>
        </section>
    );
}

const InfoSection = (props) => {
    const svgStyle = {
        height: "150px",
        width: "150px",
        fill: "rgb(0, 161, 255)",
    };
    const listings = [
        [
            <JuggleIcon style={svgStyle} />,
            "One for all.",
            "Keep track of bugs across all projecrts from just one platform.",
        ],
        [
            <CycleIcon style={svgStyle} />,
            "Natural life cycle.",
            "Bug reports naturally manage state on their own, from finding to resolving.",
        ],
        [
            <SimpleIcon style={svgStyle} />,
            "Simple to use.",
            "Experience a smooth and predictable system. Managing complex problems should be as simple as possible.",
        ],
    ].map((listing) => {
        return (
            <FeatureListing
                svg={listing[0]}
                title={listing[1]}
                mainText={listing[2]}
            />
        );
    });
    const sectionStyle = {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        color: "black",
        width: "1000px",
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
    };
    const mainStyle = {
        color: "black",
        fontFamily: "Montserrat",
        fontSize: "22px",
    };
    return (
        <section style={sectionStyle}>
            <header style={headerStyle}>
                Make keeping track of bugs across multiple projects simple.
            </header>
            <div style={featuresContainerStyle}>{listings}</div>
            <main style={mainStyle}></main>
        </section>
    );
};

function Landing(props) {
    useEffect(() => {
        document.body.style.backgroundColor = "white";
        return () => {
            document.body.style.backgroundColor = "rgb(20, 38, 51)";
        };
    }, []);

    const containerStyle = { width: "100%", position: "absolute" }
    const mainStyle = {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    }
    const sectionStyle = {
        width: "100%"
    }
    return (
        <div style={containerStyle}>
            <main style={mainStyle}>
                <section style={sectionStyle}>
                    <HookSection />
                </section>
                <section>
                    <InfoSection />
                </section>
            </main>
        </div >
    );
}

export { Landing };
