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
import { Navbar } from "util/navbar.jsx";

function Dashboard(props) {
    const selector = (key, field) => {
        return useSelector((state) => {
            return state[key][field];
        });
    };
    const alreadyLogged = selector("shared", sharedFields.LOGGED_IN);
    if (!alreadyLogged) {
        return <Redirect push to={"/login"} />;
    }
    const dispatch = useDispatch();
    const modalRef = createRef();
    const launchModalHandler = () => {
        dispatch({ type: sharedActions.PUSH_MODAL_STATE, modalState: 1 });
    };

    const currModalContext = () => {
        useEffect(() => {
            dispatch({ type: sharedActions.TOGGLE_NAV });
            return () => {
                dispatch({ type: sharedActions.TOGGLE_NAV });
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
        flexDirection: "column",
        flexWrap: "wrap",
        alignItems: "center",
        // justifyContent: "center",
        width: "100%",
    };
    return (
        <div>
            <article style={mainStyle}>
                <Button
                    text={"New Project"}
                    backgroundColor={"green"}
                    onClick={launchModalHandler}
                />
                <div style={{ marginBottom: "20px" }}></div>
                <ProjectBoard launchModalHandler={launchModalHandler} />

                <Modal assignedRef={modalRef}>{currModalContext()}</Modal>
            </article>
        </div>
    );
}

export default Dashboard;
