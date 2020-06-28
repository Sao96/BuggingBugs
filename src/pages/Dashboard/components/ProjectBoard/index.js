import React from "react";
import { ProjectCard } from "./components";

function ProjectBoard(props) {
    const projectCards = props.projects.map((proj) => {
        return <ProjectCard projectName={proj.name} pid={proj._id} />;
    });

    const mainStyle = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
    };
    return <nav style={mainStyle}>{projectCards}</nav>;
}

export { ProjectBoard };
