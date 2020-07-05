import React from "react";
import { ProjectCard } from "./components";
import { useDesktop } from "util/responsive";

function ProjectBoard(props) {
    const desktop = useDesktop();
    const [cardWidth, cardMarginRight] = [300, desktop ? 30 : 0];
    const projectCards = props.projects.map((proj, idx) => {
        return (
            <ProjectCard
                key={idx}
                projectName={proj.name}
                pid={proj._id}
                authLevel={proj.authLevel}
                width={cardWidth}
                marginRight={cardMarginRight}
                img={proj.img}
            />
        );
    });

    const boardWidth = desktop ? (cardMarginRight + cardWidth) * 3 : cardWidth;
    const mainStyle = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        width: String(boardWidth) + "px",
    };
    return <nav style={mainStyle}>{projectCards}</nav>;
}

export { ProjectBoard };
