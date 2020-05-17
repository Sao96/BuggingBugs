//initial styles taken from w3schools modal example
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { sharedActions } from "actions/sharedactions.js";

const selector = (field) => {
    return useSelector((state) => {
        return state.shared[field];
    });
};

function Modal(props) {
    let overlayStyle = {
        display: selector(sharedActions.MODAL_STATE) //if > 0, display
            ? "flex"
            : "none" /* Hidden by default */,
        position: "fixed" /* Stay in place */,
        zIndex: "4000" /* Sit on top */,
        left: "0",
        top: "0",
        width: "100%" /* Full width */,
        height: "100%" /* Full height */,
        overflow: "auto",
        backgroundColor: "rgb(0,0,0)" /* Fallback color */,
        backgroundColor: "rgba(0,0,0,0.8)" /* Black w/ opacity */,
        alignItems: "center",
    };

    const mainStyle = {
        margin: "auto",
        padding: "20px",
        border: "1px solid black",
        backgroundColor: "rgb(33, 59, 74)",
        marginTop: "50px",
        zIndex: "5000",
    };

    const dispatch = useDispatch();
    const clickHandler = (e) => {
        if (!props.assignedRef.current.contains(e.target)) {
            dispatch({ type: sharedActions.MODAL_STATE, modalState: 0 });
        }
    };
    return (
        <div style={overlayStyle} onClick={clickHandler}>
            <div ref={props.assignedRef} style={mainStyle}>
                {props.children}
            </div>
        </div>
    );
}

export default Modal;
