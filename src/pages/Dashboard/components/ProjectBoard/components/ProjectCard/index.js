import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Separator, RoleDisplay } from "./components";

function ProjectCard(props) {
    const [loadProject, setLoadProject] = useState(false);
    const launchProject = () => {
        setLoadProject(true);
    };
    if (loadProject) {
        return <Redirect push to={"/ticketboard" + "?pid=" + props.pid} />;
    }

    const projectcardStyle = {
        backgroundColor: "rgb(33, 59, 74)",
        color: "black",
        width: props.width + "px",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        marginRight: props.marginRight + "px",
        marginBottom: "30px",
        cursor: "pointer",
        boxShadow: "2px 4px 4px 0px rgba(0,0,0,0.75)",
    };
    const titleStyle = {
        color: "white",
        fontSize: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Montserrat,Source Sans Pro",
        wordBreak: "break-all",
        height: "50px",
        textAlign: "center",
    };

    return (
        <article style={projectcardStyle} onClick={launchProject}>
            <header style={titleStyle}>{props.projectName}</header>
            <Separator color={"rgb(71, 196, 255)"} />
            <div style={{ paddingBottom: "10px" }}></div>
            <img
                src="https://www.adazing.com/wp-content/uploads/2019/02/open-book-clipart-03.png"
                style={{ height: "150px", width: "150px" }}
                alt={"The group image for " + props.projectName}
            />
            <div style={{ paddingBottom: "10px" }}></div>
            <RoleDisplay authLevel={props.authLevel} />
            <span style={{ paddingBottom: "20px" }} />
        </article>
    );
}

export { ProjectCard };
