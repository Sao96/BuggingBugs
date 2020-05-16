import React, { Component, createRef, useState, useCallback } from "react";
import ProjectCard from "./projectcard.jsx";
import AddAttachmentButtonIcon from "../../../../svg/AddAttachment.svg";
import Modal from "../../util/modal.jsx";
import NewProjectForm from "./newprojectform.jsx";
import actions from "../../../reduxitems/actions.js";
import { connect, useSelector, useDispatch } from "react-redux";

const modalRef = createRef();
function DashboardX(props) {
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

    const DisplayProjects = () => {
        //convert into a component.
        return (
            <>
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
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
            </>
        );
    };

    return (
        <div style={mainStyle}>
            {DisplayProjects()}
            <Modal
                assignedRef={modalRef}
                isOpen={selector(actions.MODAL_ACTIVE)}
            >
                <NewProjectForm />
            </Modal>
        </div>
    );
}

export default DashboardX;
