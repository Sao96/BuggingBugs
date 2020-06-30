import React from "react";
import { ProjectCard } from "./components";

function ProjectBoard(props) {
    const [cardWidth, cardMarginRight] = [300, 30];
    const projectCards = props.projects.map((proj, idx) => {
        return (
            <ProjectCard
                key={idx}
                projectName={proj.name}
                pid={proj._id}
                authLevel={proj.authLevel}
                width={cardWidth}
                marginRight={cardMarginRight}
            />
        );
    });

    const boardWidth = (cardMarginRight + cardWidth) * 4;
    const mainStyle = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        width: String(boardWidth) + "px",
    };
    return <nav style={mainStyle}>{projectCards}</nav>;
}

export { ProjectBoard };
