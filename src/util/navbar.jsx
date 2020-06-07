import React, { useState, useCallback, createRef } from "react";
import { NavLink } from "react-router-dom";
import DashboardIcon from "svg/dashboard.svg";
import OpenTicketsIcon from "svg/opentickets.svg";
import LogoutIcon from "svg/logout.svg";
import { domain } from "routes";

const SizeSVG = (Comp) => {
    return <Comp style={{ width: "45px", height: "45px", fill: "white" }} />;
};
function Navbar(props) {
    const closedNavWidth = "70px";
    const openNavWidth = "200px";
    const transitionSpeed = "0.1s";
    const [navOpen, setNavStatus] = useState(false);

    const mouseOverNavHandler = () => {
        setNavStatus(true);
    };
    const mouseOutNavHandler = () => {
        setNavStatus(false);
    };
    const globalPaddingStyle = {
        paddingRight: navOpen ? openNavWidth : closedNavWidth,
        transition: "padding-right " + transitionSpeed,
    };
    const mainStyle = {
        height: "100%",
        left: "0%",
        top: "0%",
        width: navOpen ? openNavWidth : closedNavWidth,
        backgroundColor: "rgb(73, 99, 114)",
        position: "fixed",
        transition: "width " + transitionSpeed,
    };
    const textStyling = {
        display: navOpen ? "inline" : "none",
        position: "relative",
        top: "-18px",
        fontFamily: "Didact Gothic",
    };
    const liStyle = {
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        paddingTop: "20px",
        paddingBottom: "10px",
        height: "50px",
    };

    const items = [
        ["Dashboard", DashboardIcon, createRef(), "/dashboard"],
        ["Logout", LogoutIcon, createRef(), "/logout"],
    ].map((item) => {
        return (
            <div
                style={liStyle}
                onMouseOver={useCallback(() => {
                    item[2].current.style.backgroundColor = "rgb(43, 69, 84)";
                }, [item[2]])}
                onMouseOut={useCallback(() => {
                    item[2].current.style.backgroundColor = "rgb(0,0,0,0)";
                }, [item[2]])}
                ref={item[2]}
            >
                <NavLink
                    to={item[3]}
                    style={{ textDecoration: "none", color: "white" }}
                >
                    <div
                        style={{
                            display: "inline-block",
                            whiteSpace: "nowrap",
                            position: "relative",
                            paddingLeft: "10px",
                            // left: "10px",
                        }}
                    >
                        {SizeSVG(item[1])}
                        <span style={textStyling}>{item[0]}</span>
                    </div>
                </NavLink>
            </div>
        );
    });

    return (
        <div style={globalPaddingStyle}>
            <div
                onMouseOver={mouseOverNavHandler}
                onMouseOut={mouseOutNavHandler}
                style={mainStyle}
            >
                {items}
            </div>
        </div>
    );
}

export { Navbar };
