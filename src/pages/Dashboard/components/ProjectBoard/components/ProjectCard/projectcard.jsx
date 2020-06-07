import React, { useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { PieChart } from "react-minimal-pie-chart";

function ProjectStatusChart(props) {
    const [hovered, setHovered] = useState(null);
    const data = [
        {
            color: "rgb(129,221,227)",
            value: 45,
            text: "Due",
        },
        {
            color: "rgb(185,191,225)",
            value: 30,
            text: "Pending Approval",
        },
        {
            color: "rgb(99,99,187)",
            value: 20,
            text: "Pending",
        },
    ];
    const lineWidth = 60;
    return (
        <PieChart
            style={{
                width: "350px",
                height: "400px",

                fontFamily:
                    '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
            }}
            animate={true}
            animationDuration={300}
            animationEasing="ease-out"
            center={[50, 50]}
            data={data}
            label={(item) => {
                return hovered === item.dataIndex
                    ? item.dataEntry.text
                    : item.dataEntry.value + "%";
            }}
            radius={PieChart.defaultProps.radius - 6}
            lineWidth={60}
            segmentsStyle={{
                transition: "stroke .3s",
                cursor: "pointer",
            }}
            animate={true}
            startAngle={70}
            segmentsShift={(index) => (index === hovered ? 5 : 0)}
            labelPosition={100 - lineWidth / 2}
            labelStyle={(index) => {
                return {
                    fill: "#fff",
                    pointerEvents: "none",
                    opacity: ".98",
                    fontSize: hovered === index ? "7px" : "7px",
                    fontFamily:
                        '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
                };
            }}
            onMouseOver={(_, idx) => {
                setHovered(idx);
            }}
            onMouseOut={() => {
                setHovered(null);
            }}
        />
    );
}
export default function ProjectCard(props) {
    const Separator = (color) => {
        const styles = {
            border: "1px solid " + color,
            width: "90%",
            position: "relative",
            top: "15px",
        };
        return <div style={styles}> </div>;
    };
    const projectcardStyle = {
        backgroundColor: "rgb(33, 59, 74)",
        color: "black",
        width: "400px",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        marginRight: "10px",
        marginBottom: "10px",
        cursor: "pointer",
    };
    const headerStyle = {
        color: "white",
        fontSize: "40px",
        fontFamily: "Montserrat,Source Sans Pro",
        position: "relative",
        top: "15px",
    };
    const unreadStyle = {
        color: "white",
        fontSize: "30px",
        fontFamily: "Didact Gothic",
        position: "relative",
        bottom: "20px",
    };

    return (
        <div style={projectcardStyle}>
            <NavLink
                to={"/ticketboard" + "?pid=" + props.pid}
                style={{ textDecoration: "none" }}
            >
                <div style={headerStyle}>{props.projectName}</div>
                {Separator("rgb(71, 196, 255)")}
                <ProjectStatusChart />

                <div style={unreadStyle}>
                    Tickets Unread:{" "}
                    <span style={{ color: "rgb(255, 241, 133)" }}>5</span>
                </div>
            </NavLink>
        </div>
    );
}
