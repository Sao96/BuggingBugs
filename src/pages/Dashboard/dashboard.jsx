import React, { createRef, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import ProjectBoard from "./components/ProjectBoard/projectboard.jsx";
import { dashboardActions } from "actions/dashboardactions.js";
import { sharedActions } from "actions/sharedactions.js";
import { sharedFields } from "fields/sharedfields.js";
import { useSelector, useDispatch } from "react-redux";
import Modal from "util/modal.jsx";
import ModalNewProject from "./components/ModalNewProject/modalnewproject.jsx";
import ModalCreateProject from "./components/ModalCreateProject/modalcreateproject.jsx";
import ModalJoinProject from "./components/ModalJoinProject/modaljoinproject.jsx";
import Button from "util/Button.jsx";

function Dashboard(props) {
    const selector = (key, field) => {
        return useSelector((state) => {
            return state[key][field];
        });
    };
    const alreadyLogged = selector("shared", sharedFields.LOGGED_IN);
    if (!alreadyLogged) {
        return <Redirect to={"/login"} />;
    }
    const dispatch = useDispatch();
    const modalRef = createRef();
    const launchModalHandler = () => {
        dispatch({ type: sharedActions.PUSH_MODAL_STATE, modalState: 1 });
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
    const mainStyle = {
        color: "white",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        justifyContent: "center",
        flexDirection: "column",
    };
    return (
        <div>
            <main style={mainStyle}>
                <Button
                    text={"New Project"}
                    backgroundColor={"green"}
                    onClick={launchModalHandler}
                />
                <div style={{ marginBottom: "20px" }}></div>
                <ProjectBoard launchModalHandler={launchModalHandler} />

                <Modal assignedRef={modalRef}>{currModalContext()}</Modal>
            </main>
        </div>
    );
}

export default Dashboard;
