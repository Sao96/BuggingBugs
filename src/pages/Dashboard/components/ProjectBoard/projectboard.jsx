import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProjectCard from "./components/ProjectCard/projectcard.jsx";
import AddAttachmentButtonIcon from "svg/AddAttachment.svg";
import { dashboardFields } from "fields/dashboardfields";
import { domain } from "routes";
import { dashboardActions } from "actions/dashboardactions.js";

function ProjectBoard(props) {
    const projects = props.projects;
    const projectCards = projects.map((proj) => {
        return <ProjectCard projectName={proj.name} pid={proj._id} />;
    });

    const mainStyle = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
    };
    return <div style={mainStyle}>{projectCards}</div>;
}

export default ProjectBoard;
