import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { navRoutes } from "navRoutes";
import { Separator } from "./components/Separator";

function ProjectCard(props) {
    const [loadProject, setLoadProject] = useState(false);
    const launchProject = () => {
        setLoadProject(true);
    };
    if (loadProject) {
        return (
            <Redirect push to={navRoutes.ticketboard + "?pid=" + props.pid} />
        );
    }

    const containerStyle = {
        backgroundColor: "rgb(33, 59, 74)",
        color: "black",
        width: "300px",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        marginRight: "10px",
        marginBottom: "10px",
        cursor: "pointer",
    };
    const titleStyle = {
        color: "white",
        display: "flex",
        justifyContent: "center",
        fontSize: "30px",
        fontFamily: "Montserrat,Source Sans Pro",
        paddingTop: "10px",
    };

    return (
        <article style={containerStyle} onClick={launchProject}>
            <header style={titleStyle}>{props.projectName}</header>
            <Separator color={"rgb(71, 196, 255)"} />
            <span style={{ paddingBottom: "10px" }} />
            <img
                src="https://www.adazing.com/wp-content/uploads/2019/02/open-book-clipart-03.png"
                style={{ height: "200px", width: "200px" }}
                alt=""
            />
            <span style={{ paddingBottom: "10px" }} />
        </article>
    );
}

export { ProjectCard };
