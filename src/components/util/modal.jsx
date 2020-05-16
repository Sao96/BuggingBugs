//initial styles taken from w3schools modal example
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from "../../reduxitems/actions.js";

const selector = (field) => {
    return useSelector((state) => {
        return state[field];
    });
};

function Modal(props) {
    let overlayStyle = {
        display: selector(actions.MODAL_ACTIVE)
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
            dispatch({ type: actions.MODAL_ACTIVE });
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
