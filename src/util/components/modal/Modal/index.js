import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sharedActions } from "actions/sharedactions.js";
import { sharedFields } from "fields/sharedfields.js";
import BackArrow from "svg/backarrow.svg";
import { textHoverColor } from "util/themeColors";

function Modal(props) {
    const dispatch = useDispatch();
    const [hovered, setHovered] = useState(false);
    const modalStack = useSelector((state) => {
        return state.shared[sharedFields.MODAL_STACK];
    });
    let overlayStyle = {
        display: modalStack.length ? "flex" : "none",
        position: "fixed",
        zIndex: "1",
        left: "0",
        top: "0",
        width: "100%",
        height: "100%",
        overflow: "auto",
        backgroundColor: "rgb(0,0,0)",
        backgroundColor: "rgba(0,0,0,0.8)",
        alignItems: "center",
    };
    const mainStyle = {
        margin: "auto",
        padding: "20px",
        border: "1px solid black",
        backgroundColor: "rgb(33, 59, 74)",
        marginTop: "50px",
        zIndex: "2",
        position: "relative",
        minWidth: "400px",
        minHeight: "250px",
    };
    const contentClickHandler = (e) => {
        e.stopPropagation();
    };
    const outsideClickHandler = (e) => {
        dispatch({ type: sharedActions.EMPTY_MODAL_STACK });
    };
    const backButtonHandler = () => {
        dispatch({ type: sharedActions.POP_MODAL_STATE });
    };
    const backArrowSvgStyle = {
        height: "30px",
        width: "30px",
        fill: hovered ? textHoverColor : "rgb(200,200,200)",
        position: "absolute",
        cursor: "pointer",
        zIndex: "2",
    };

    return (
        <div style={overlayStyle} onClick={outsideClickHandler}>
            <div style={mainStyle} onClick={contentClickHandler}>
                <BackArrow
                    style={backArrowSvgStyle}
                    onClick={backButtonHandler}
                    onMouseOver={() => {
                        setHovered(true);
                    }}
                    onMouseOut={() => {
                        setHovered(false);
                    }}
                />
                <main style={{ margin: "40px" }}>{props.children}</main>
            </div>
        </div>
    );
}

export { Modal };
