//initial styles taken from w3schools modal example
import React, { useState } from "react";
import { connect } from "react-redux";

function mapStateToProps(state) {
    return {
        isOpen: state.MODAL_ACTIVE,
    };
}

function Modal(props) {
    let overlayStyle = {
        display: props.isOpen ? "flex" : "none" /* Hidden by default */,
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

    const contentStyle = {
        margin: "auto",
        padding: "20px",
        border: "1px solid black",
        backgroundColor: "rgb(33, 59, 74)",
        marginTop: "50px",
    };

    return (
        <div style={overlayStyle}>
            <div ref={props.assignedRef} style={contentStyle}>
                {props.children}
            </div>
        </div>
    );
}

export default connect(mapStateToProps)(Modal);
