import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sharedActions as sA } from "actions/sharedactions";
import { textHoverColor } from "util/themeColors";

function TryAppButton(props) {
    const dispatch = useDispatch();
    const [hovered, setHovered] = useState(false);
    const onMouseEnterHandler = () => {
        setHovered(true);
    };
    const onMouseLeaveHandler = () => {
        setHovered(false);
    };
    const tryButtonHandler = () => {
        dispatch({ type: sA.PUSH_MODAL_STATE, modalState: 1 });
    };
    const buttonText = "Try it out!";
    const containerStyle = {
        padding: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: hovered ? "1px solid " + textHoverColor : "1px solid white",
        color: hovered ? textHoverColor : "white",
        fontFamily: "Montserrat",
        fontWeight: "300",
        fontSize: "20px",
        width: "135px",
        height: "22.5px",
        userSelect: "none",
        cursor: "pointer",
    };
    return (
        <div
            style={containerStyle}
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
            onClick={tryButtonHandler}
        >
            {buttonText}
        </div>
    );
}

export { TryAppButton };
