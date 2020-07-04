import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HookSection, InfoSection } from "./components";
import { landingBackgroundColor, mainBackgroundColor } from "themeColors";
import { sharedActions } from "actions/sharedactions.js";
import { sharedFields } from "fields/sharedfields.js";
import { ModalDemoInfo, ModalDemoSetup } from "./ModalContexts";
import { Modal } from "util/components/modal";
function Landing(props) {
    const currModalStack = useSelector((state) => {
        return state.shared[sharedFields.MODAL_STACK];
    });
    useEffect(() => {
        document.body.style.backgroundColor = landingBackgroundColor;
        return () => {
            document.body.style.backgroundColor = mainBackgroundColor;
        };
    }, []);
    const currModalContext = () => {
        switch (currModalStack[currModalStack.length - 1]) {
            case 1:
                return <ModalDemoInfo />;
            case 2:
                return <ModalDemoSetup />;
        }
    };
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
            <Modal>{currModalContext()}</Modal>
            <main style={mainStyle}>
                <HookSection />
                <InfoSection />
            </main>
        </article>
    );
}

export { Landing };
