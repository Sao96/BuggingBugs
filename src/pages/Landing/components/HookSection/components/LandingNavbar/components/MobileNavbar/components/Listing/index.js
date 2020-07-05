import React from "react";
import { NavLink } from "react-router-dom";

function Listing(props) {
    const containerStyle = {
        color: "rgb(0, 196, 255)",
        fontFamily: "Montserrat",
        fontSize: "25px",
        textAlign: "center",
        // width: props.width,
        // paddingLeft: props.padding,
        paddingTop: props.padding,
    };

    return (
        <NavLink
            to={props.route}
            style={{ textDecoration: "none", color: "white" }}
        >
            <section style={containerStyle}>{props.text}</section>
        </NavLink>
    );
}

export { Listing };
