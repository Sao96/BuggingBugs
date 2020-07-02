import React, { useState, useCallback, createRef } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import DashboardIcon from "svg/dashboard.svg";
import OpenTicketsIcon from "svg/opentickets.svg";
import LogoutIcon from "svg/logout.svg";
import SettingsIcon from "svg/settings.svg";
import { domain } from "routes";
import { sharedFields } from "fields/sharedfields";

const SizeSVG = (Comp) => {
    return (
        <Comp
            style={{
                position: "relative",
                top: "7px",
                width: "45px",
                height: "45px",
                fill: "white",
            }}
        />
    );
};

const SizeImg = (img) => {
    return (
        <img
            style={{
                width: "45px",
                height: "45px",
                borderRadius: "100%",
            }}
            src={img}
        />
    );
};
function MainNavbar(props) {
    const closedNavWidth = "70px";
    const openNavWidth = "200px";
    const transitionSpeed = "0.1s";
    const [showNav, userName, pfpImage] = useSelector((state) => {
        return [
            state.shared[sharedFields.SHOW_NAV],
            state.shared[sharedFields.USER_DATA].name,
            state.shared[sharedFields.USER_DATA].pfp,
        ];
    });
    const [navOpen, setNavStatus] = useState(false);

    const mouseOverNavHandler = () => {
        setNavStatus(true);
    };
    const mouseOutNavHandler = () => {
        setNavStatus(false);
    };
    const containerStyle = {
        display: showNav ? "" : "none",
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
        userSelect: "none",
    };
    const textStyling = {
        display: navOpen ? "inline" : "none",
        position: "relative",
        top: "-10px",
        fontFamily: "Didact Gothic",
        color: "white",
        fontSize: "20px",
        paddingLeft: "10px",
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
        ["Dashboard", "svg", DashboardIcon, createRef(), "/dashboard"],
        ["Settings", "img", pfpImage, createRef(), "/settings"],
        ["Logout", "svg", LogoutIcon, createRef(), "/logout"],
    ].map((item) => {
        return (
            <div
                style={liStyle}
                onMouseOver={useCallback(() => {
                    item[3].current.style.backgroundColor = "rgb(43, 69, 84)";
                }, [item[3]])}
                onMouseOut={useCallback(() => {
                    item[3].current.style.backgroundColor = "rgb(0,0,0,0)";
                }, [item[3]])}
                ref={item[3]}
            >
                <NavLink
                    to={item[4]}
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
                        {item[1] === "svg"
                            ? SizeSVG(item[2])
                            : SizeImg(item[2])}
                        <span style={textStyling}>{item[0]}</span>
                    </div>
                </NavLink>
            </div>
        );
    });

    return (
        <div style={containerStyle}>
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

export { MainNavbar };
