import React, { useEffect } from "react";
import { HookSection } from "./components/HookSection";
import { InfoSection } from "./components/InfoSection";
import { landingBackgroundColor, mainBackgroundColor } from "themeColors";

function Landing(props) {
    useEffect(() => {
        document.body.style.backgroundColor = landingBackgroundColor;
        return () => {
            document.body.style.backgroundColor = mainBackgroundColor;
        };
    }, []);
    const containerStyle = {
        backgroundColor: "white",
    };
    const mainStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    };

    return (
        <article style={containerStyle}>
            <main style={mainStyle}>
                <HookSection />
                <InfoSection />
            </main>
        </article>
    );
}

export { Landing };
