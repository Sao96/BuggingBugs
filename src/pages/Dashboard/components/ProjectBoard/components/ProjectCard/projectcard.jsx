import React, { useState, useCallback } from "react";
import { Redirect } from "react-router-dom";
import { PieChart } from "react-minimal-pie-chart";

export default function ProjectCard(props) {
    const [loadProject, setLoadProject] = useState(false);
    const launchProject = () => {
        setLoadProject(true);
    };
    if (loadProject) {
        return <Redirect push to={"/ticketboard" + "?pid=" + props.pid} />;
    }
    const Separator = (color) => {
        const styles = {
            border: "1px solid " + color,
            width: "90%",
        };
        return <div style={styles}> </div>;
    };
    const projectcardStyle = {
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
    const unreadStyle = {
        color: "white",
        fontSize: "30px",
        fontFamily: "Didact Gothic",
    };

    return (
        <div style={projectcardStyle} onClick={launchProject}>
            <div style={titleStyle}>{props.projectName}</div>
            {Separator("rgb(71, 196, 255)")}
            <div style={{ paddingBottom: "10px" }}></div>
            <img
                src="https://www.adazing.com/wp-content/uploads/2019/02/open-book-clipart-03.png"
                style={{ height: "200px", width: "200px" }}
            />
            <div style={{ paddingBottom: "10px" }}></div>
            <div style={unreadStyle}>
                Tickets Unread:{" "}
                <span style={{ color: "rgb(255, 241, 133)" }}>5</span>
            </div>
        </div>
    );
}
