import React from "react";
import { HookSection } from "./components/HookSection";
import { InfoSection } from "./components/InfoSection";

function Landing(props) {
    const containerStyle = { width: "100%" };
    const mainStyle = {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
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
