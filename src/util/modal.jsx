//initial styles taken from w3schools modal example
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { sharedActions } from "actions/sharedactions.js";
import { sharedFields } from "fields/sharedfields.js";
import BackArrow from "svg/backarrow.svg";
const selector = (field) => {
    return useSelector((state) => {
        return state.shared[field];
    });
};

function Modal(props) {
    let overlayStyle = {
        display: selector(sharedFields.MODAL_STACK).length ? "flex" : "none",
        position: "fixed",
        zIndex: "4000",
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
        zIndex: "5000",
        position: "relative",
    };
    const dispatch = useDispatch();
    const clickHandler = (e) => {
        if (!props.assignedRef.current.contains(e.target)) {
            dispatch({ type: sharedActions.EMPTY_MODAL_STACK });
        }
    };
    const backButtonHandler = () => {
        dispatch({ type: sharedActions.POP_MODAL_STATE });
    };
    const backArrowSvgStyle = {
        height: "70px",
        width: "70px",
        fill: "rgb(200,200,200)",
        position: "absolute",
        cursor: "pointer",
        zIndex: "5000",
    };

    return (
        <div style={overlayStyle} onClick={clickHandler}>
            <div ref={props.assignedRef} style={mainStyle}>
                <BackArrow
                    style={backArrowSvgStyle}
                    onClick={backButtonHandler}
                />
                {props.children}
            </div>
        </div>
    );
}

export default Modal;
