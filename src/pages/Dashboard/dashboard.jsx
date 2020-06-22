import React, { createRef, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import ProjectBoard from "./components/ProjectBoard/projectboard.jsx";
import { dashboardActions } from "actions/dashboardactions.js";
import { sharedActions } from "actions/sharedactions.js";
import { sharedFields } from "fields/sharedfields.js";
import { useSelector, useDispatch } from "react-redux";
import { dashboardFields } from "fields/dashboardfields";
import Modal from "util/modal.jsx";
import ModalNewProject from "./components/ModalNewProject/modalnewproject.jsx";
import ModalCreateProject from "./components/ModalCreateProject/modalcreateproject.jsx";
import ModalJoinProject from "./components/ModalJoinProject/modaljoinproject.jsx";
import Button from "util/Button.jsx";
import ClipLoader from "react-spinners/ClipLoader";
import { ErrorBox } from "util/ErrorBox";
import { domain } from "routes";

const selector = (key, field) => {
    return useSelector((state) => {
        return state[key][field];
    });
};
const getProjects = async (setRes, setProjectsLoading, dispatch) => {
    setProjectsLoading(true);
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const endpoint = domain + "getprojects";
    const res = await fetch(endpoint, {
        method: "GET",
        headers: headers,
        credentials: "include",
        mode: "cors",
        cache: "no-cache",
        redirect: "follow",
    });
    setProjectsLoading(false);
    const resStatus = res.status,
        resData = await res.json();
    setRes([resData, resStatus]);
    if (res.status === 200) {
        dispatch({
            type: dashboardActions.SET_PROJECTS,
            projects: resData.projects,
        });
    }
};
const ProjectsLoadingDisplay = (props) => {
    if (props.loading) {
        const containerStyle = {
            position: "fixed",
            // width: "100%",
            // height: "100%",
            left: "50%",
            top: "25%",
            zIndex: 1,
        };
        return (
            <div style={containerStyle}>
                <ClipLoader
                    size={150}
                    color={"rgb(200,200,200)"}
                    loading={true}
                />
            </div>
        );
    }

    return <></>;
};
const ResRender = (props) => {
    const res = props.res;
    const setError = props.setError;
    switch (res[1]) {
        case -1: //print loadng
            return <></>;
        case 200:
            return <></>;
        case 300:
            return <Redirect push to={"/dashboard"} />;
        default:
            return <ErrorBox text={res[0]} />;
    }
};

function Dashboard(props) {
    const dispatch = useDispatch();
    const [res, setRes] = useState(["", -1]);
    const [projectsLoading, setProjectsLoading] = useState(true);
    const [projects, refreshNeeded] = useSelector((state) => {
        return [
            state.dashboard[dashboardFields.PROJECTS],
            state.dashboard[dashboardFields.PROJECTS_MODIFIED],
        ];
    });
    useEffect(() => {
        getProjects(setRes, setProjectsLoading, dispatch);
    }, [refreshNeeded]);

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
        justifyContent: "center",
        width: "100%",
    };
    return (
        <article style={mainStyle}>
            <ProjectsLoadingDisplay loading={projectsLoading} />
            <ResRender res={res} />
            <Button
                text={"New Project"}
                backgroundColor={"green"}
                onClick={launchModalHandler}
            />
            <div style={{ marginBottom: "20px" }}></div>
            <ProjectBoard
                projects={projects}
                launchModalHandler={launchModalHandler}
            />

            <Modal assignedRef={modalRef}>{currModalContext()}</Modal>
        </article>
    );
}

export default Dashboard;
