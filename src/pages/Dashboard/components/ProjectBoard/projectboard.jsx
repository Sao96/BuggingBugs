import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProjectCard from "./components/ProjectCard/projectcard.jsx";
import AddAttachmentButtonIcon from "svg/AddAttachment.svg";
import { dashboardFields } from "fields/dashboardfields";
import { domain } from "routes";
import { dashboardActions } from "actions/dashboardactions.js";

const getProjects = async (dispatch) => {
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
    }); //THEN get the info to build the cards
    const data = await res.json();
    if (res.status === 200) {
        dispatch({
            type: dashboardActions.SET_PROJECTS,
            projects: data.projects,
        });
        // setProjects(data.projects);
    } else if (res.status === 300) {
        window.location.href = data.url;
    } else {
        window.location.href = "/";
    }
};

function ProjectBoard(props) {
    const [projects, refreshNeeded] = useSelector((state) => {
        return [
            state.dashboard[dashboardFields.PROJECTS],
            state.dashboard[dashboardFields.PROJECTS_MODIFIED],
        ];
    });
    const dispatch = useDispatch();
    useEffect(() => {
        getProjects(dispatch);
    }, [refreshNeeded]);
    useDispatch({ type: dashboardActions.SET_PROJECTS_MODIFIED });

    const projectCards = projects.map((proj) => {
        return <ProjectCard projectName={proj.name} pid={proj._id} />;
    });
    const addAttachmentButtonStyle = {
        height: "100px",
        width: "100px",
        fill: "white",
        paddingLeft: "10px",
        cursor: "pointer",
    };
    const mainStyle = {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
    };
    return <div style={mainStyle}>{projectCards}</div>;
}

export default ProjectBoard;
