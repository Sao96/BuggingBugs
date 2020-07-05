import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { navbarColor1 } from "themeColors";

function Listing(props) {
    const [hovered, setHovered] = useState(false);
    const onClickHandler = () => {
        props.setOpen(false);
    };
    const mouseEnterHandler = () => {
        setHovered(true);
    };
    const mouseLeaveHandler = () => {
        setHovered(false);
    };
    const containerStyle = {
        backgroundColor: hovered ? "rgb(43, 69, 84)" : navbarColor1,
        padding: "20px",
        userSelect: "none",
        cursor: "pointer",
        color: "white",
        fontFamily: "Didact Gothic",
        fontSize: "20px",
    };

    return (
        <NavLink
            to={props.route}
            style={{ textDecoration: "none", color: "white" }}
        >
            <section
                onMouseEnter={mouseEnterHandler}
                onMouseLeave={mouseLeaveHandler}
                onClick={onClickHandler}
                style={containerStyle}
            >
                {props.text}
            </section>
        </NavLink>
    );
}

export { Listing };
