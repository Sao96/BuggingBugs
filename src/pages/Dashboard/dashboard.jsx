import React, { Component, createRef, useState, useCallback } from "react";
import AddAttachmentButtonIcon from "svg/AddAttachment.svg";
import Modal from "../../util/modal.jsx";
import ModalCtx1 from "./components/ModalCtx1/modalctx1.jsx";
import ProjectBoard from "./components/ProjectBoard/projectboard.jsx";
import actions from "reduxitems/actions.js";
import { useSelector, useDispatch } from "react-redux";

function Dashboard(props) {
    const modalRef = createRef();
    const dispatch = useDispatch();
    const selector = (field) => {
        return useSelector((state) => {
            return state[field];
        });
    };
    const launchModalHandler = () => {
        dispatch({ type: actions.MODAL_ACTIVE });
    };

    const mainStyle = {
        color: "white",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
    };

    return (
        <div style={mainStyle}>
            <ProjectBoard />
            <AddAttachmentButtonIcon
                style={{
                    height: "100px",
                    width: "100px",
                    fill: "white",
                    paddingLeft: "10px",
                    cursor: "pointer",
                }}
                onClick={launchModalHandler}
            />
            <Modal
                assignedRef={modalRef}
                isOpen={selector(actions.MODAL_ACTIVE)}
            >
                <ModalCtx1 />
            </Modal>
        </div>
    );
}

export default Dashboard;
