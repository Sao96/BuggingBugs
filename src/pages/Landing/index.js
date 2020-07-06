import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HookSection, InfoSection } from "./components";
import { landingBackgroundColor, mainBackgroundColor } from "themeColors";
import { sharedFields } from "fields/sharedfields.js";
import { ModalDemoInfo, ModalDemoSetup } from "./ModalContexts";
import { Modal } from "util/components/modal";
import { useMediaQuery } from "react-responsive";
import { sharedActions as sA } from "actions/sharedactions";

function Landing(props) {
    const dispatch = useDispatch();
    const currModalStack = useSelector((state) => {
        return state.shared[sharedFields.MODAL_STACK];
    });
    useEffect(() => {
        document.body.style.backgroundColor = landingBackgroundColor;
        return () => {
            document.body.style.backgroundColor = mainBackgroundColor;
            dispatch({
                type: sA.EMPTY_MODAL_STACK,
            });
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

    const useDesktop = useMediaQuery({
        query: "(min-device-width: 1001px)",
    });
    const maxWidth = "320px";

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
                <HookSection maxWidth={maxWidth} useDesktop={useDesktop} />
                <InfoSection maxWidth={maxWidth} useDesktop={useDesktop} />
            </main>
        </article>
    );
}

export { Landing };
