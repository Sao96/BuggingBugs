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
        display: props.isOpen ? "block" : "none" /* Hidden by default */,
        position: "fixed" /* Stay in place */,
        zIndex: "4000" /* Sit on top */,
        paddingTop: "100px" /* Location of the box */,
        left: "0",
        top: "0",
        width: "100%" /* Full width */,
        height: "100%" /* Full height */,
        overflow: "auto" /* Enable scroll if needed */,
        backgroundColor: "rgb(0,0,0)" /* Fallback color */,
        backgroundColor: "rgba(0,0,0,0.6)" /* Black w/ opacity */,
    };

    const contentStyle = {
        margin: "auto",
        padding: "20px",
        border: "1px solid black",
        width: "50%",
        backgroundColor: "rgb(33, 59, 74)",
        display: "flex",
        justifyContent: "center",
        position: "relative",
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
