import React, { createRef, useState, useEffect } from "react";
import ProjectBoard from "./components/ProjectBoard/projectboard.jsx";
import { dashboardActions } from "actions/dashboardactions.js";
import { sharedActions } from "actions/sharedactions.js";
import { sharedFields } from "fields/sharedfields.js";
import { useSelector, useDispatch } from "react-redux";
import Modal from "util/modal.jsx";
import ModalNewProject from "./components/ModalNewProject/modalnewproject.jsx";
import ModalCreateProject from "./components/ModalCreateProject/modalcreateproject.jsx";
import ModalJoinProject from "./components/ModalJoinProject/modaljoinproject.jsx";
import { Navbar } from "util/navbar.jsx";

function Dashboard(props) {
    const modalRef = createRef();
    const dispatch = useDispatch();
    const selector = (key, field) => {
        return useSelector((state) => {
            return state[key][field];
        });
    };
    const launchModalHandler = () => {
        dispatch({ type: sharedActions.PUSH_MODAL_STATE, modalState: 1 });
    };

    const mainStyle = {
        color: "white",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
    };

    const currModalContext = () => {
        useEffect(() => {
            return () => {
                dispatch({ type: sharedActions.EMPTY_MODAL_STACK });
            };
        }, []);
        const currModalStack = selector("shared", sharedFields.MODAL_STACK);
        switch (currModalStack[currModalStack.length - 1]) {
            case 1:
                return <ModalNewProject />;
            case 2:
                return <ModalCreateProject />;
            case 3:
                return <ModalJoinProject />;
        }
    };
    return (
        <div>
            <main style={mainStyle}>
                <ProjectBoard launchModalHandler={launchModalHandler} />

                <Modal assignedRef={modalRef}>{currModalContext()}</Modal>
            </main>
        </div>
    );
}

export default Dashboard;
