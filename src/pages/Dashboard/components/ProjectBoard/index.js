import React from "react";
import { ProjectCard } from "./components";

function ProjectBoard(props) {
    const projectCards = props.projects.map((proj, idx) => {
        return (
            <ProjectCard
                key={idx}
                projectName={proj.name}
                pid={proj._id}
                authLevel={proj.authLevel}
            />
        );
    });

    const cardMargin = 30;
    const cardWidth = 300;
    const boardWidth = (cardMargin + cardWidth) * 4;
    const mainStyle = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        width: String(boardWidth) + "px",
    };
    return <nav style={mainStyle}>{projectCards}</nav>;
}

export { ProjectBoard };
