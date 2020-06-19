import React, { useEffect, createRef, useCallback } from "react";
import { LandingNavbar } from "./components/LandingNavbar";
import SimpleIcon from "svg/simple.svg";
import CycleIcon from "svg/cycle.svg";
import JuggleIcon from "svg/juggle.svg";

const HookSection = () => {
    const TryAppButton = (props) => {
        const style = {
            padding: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "green",
            fontFamily: "Montserrat",
            fontWeight: "300",
            color: "white",
            fontSize: "22.5px",
            width: "135px",
            height: "22.5px",
            border: "1px rgb(0,100,10) solid",
        };
        return <div style={style}>Try it out!</div>;
    };
    const hookStyle = {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        paddingBottom: "30px",
        alignItems: "center",
        justifyContent: "center",
        color: "black",
        fontFamily: " PT Sans, Noto Sans JP",
        background: "#43c6ac",
        background: "-webkit-linear-gradient(to right, #43c6ac, #191654)",
        background: "linear-gradient(to right, #43c6ac, #191654)",
    };
    const mainHeaderStyle = {
        color: "white",
        fontSize: "45px",
        marginTop: "0px",
        marginBottom: "0px",
        fontFamily: "Montserrat",
        fontWeight: "200",
        position: "relative",
        paddingTop: "90px",
        paddingBottom: "90px",
    };

    return (
        <section style={hookStyle}>
            <LandingNavbar />
            <img
                style={{
                    width: "450px",
                    height: "165px",
                    position: "relative",
                    top: "40px",
                }}
                src="https://media.discordapp.net/attachments/704894643317243997/723136903070875658/buggingbugW3x.png"
            />
            <h1 style={mainHeaderStyle}>A bug tracking solution.</h1>
            <TryAppButton />
        </section>
    );
};

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

const MainSection = (props) => {
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

    return (
        <div style={{ width: "100%", position: "absolute" }}>
            <article
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <HookSection />
                <MainSection />
            </article>
        </div>
    );
}

export { Landing };
