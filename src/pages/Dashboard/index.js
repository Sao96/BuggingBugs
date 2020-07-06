import React, { createRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dashboardFields as dbF } from "fields/dashboardfields";
import { sharedActions as sA } from "actions/sharedactions";
import { sharedFields as sF } from "fields/sharedfields";
import { Modal } from "modal";
import { DefaultButton } from "util/components/buttons";
import {
    ModalNewProject,
    ModalCreateProject,
    ModalJoinProject,
} from "./ModalContexts";
import { ProjectBoard, ResRender, ProjectsLoadingDisplay } from "./components";
import { getGetProjects } from "apiCalls/BuggingBugs/GET";
import { MainNavbar } from "util/components/navbars/MainNavbar";

function Dashboard(props) {
    const dispatch = useDispatch();
    const [res, setRes] = useState([-1, ""]);
    const [projectsLoading, setProjectsLoading] = useState(true);
    const modalRef = createRef();
    const [projects, refreshNeeded, currModalStack] = useSelector((state) => {
        return [
            state.dashboard[dbF.PROJECTS],
            state.dashboard[dbF.PROJECTS_MODIFIED],
            state.shared[sF.MODAL_STACK],
        ];
    });

    useEffect(() => {
        getGetProjects(setRes, setProjectsLoading, dispatch);
    }, [refreshNeeded]);
    useEffect(() => {
        dispatch({ type: sA.TOGGLE_NAV });
        return () => {
            dispatch({ type: sA.TOGGLE_NAV });
            dispatch({ type: sA.EMPTY_MODAL_STACK });
        };
    }, []);

    const newProjectButtonHandler = () => {
        dispatch({ type: sA.PUSH_MODAL_STATE, modalState: 1 });
    };

    const currModalContext = () => {
        switch (currModalStack[currModalStack.length - 1]) {
            case 1:
                return <ModalNewProject />;
            case 2:
                return <ModalCreateProject />;
            case 3:
                return <ModalJoinProject />;
            default:
                return <></>;
        }
    };
    const containerStyle = {
        color: "white",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
    };
    return (
        <article>
            <MainNavbar />
            <article style={containerStyle}>
                <Modal assignedRef={modalRef}>{currModalContext()}</Modal>
                <ProjectsLoadingDisplay loading={projectsLoading} />
                <ResRender res={res} />
                <DefaultButton
                    text={"New Project"}
                    backgroundColor={"green"}
                    onClick={newProjectButtonHandler}
                />
                <span style={{ marginBottom: "20px" }}></span>
                <main>
                    <ProjectBoard projects={projects} />
                </main>
            </article>
        </article>
    );
}

export { Dashboard };
