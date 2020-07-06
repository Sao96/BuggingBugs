import React, { useState } from "react";
import { navbarColor1 } from "themeColors";
import { Listing } from "./components";
import DrawerIcon from "svg/drawerhandler.svg";
import { navRoutes } from "navRoutes";

function MobileNavbar(props) {
    const [open, setOpen] = useState(false);
    const toggleNavbar = () => {
        setOpen(!open);
    };
    const items = [
        ["Dashboard", navRoutes.dashboard],
        ["Settings", navRoutes.settings],
        ["Logout", navRoutes.logout],
    ].map((item, idx) => {
        return (
            <Listing
                key={idx}
                setOpen={setOpen}
                text={item[0]}
                route={item[1]}
            />
        );
    });
    const containerStyle = {
        position: "sticky",
        top: "0px",
        left: "0px",
        zIndex: "1",
        width: "100%",
    };
    const toggleStyle = {
        height: "50px",
        backgroundColor: navbarColor1,
    };
    const navItemsStyle = {
        visibility: !open ? "hidden" : "visible",
        opacity: !open ? 0 : 1,
        display: !open ? "none" : "flex",
        flexDirection: "column",
        height: open ? "0px" : "",
        transition: "opacity 100ms",
    };

    return (
        <div style={{ marginBottom: "10px" }}>
            <nav style={containerStyle}>
                <section style={toggleStyle}>
                    <DrawerIcon
                        onClick={toggleNavbar}
                        style={{
                            fill: "rgb(240,240,240)",
                            height: "35px",
                            width: "35px",
                            cursor: "pointer",
                            position: "relative",
                            left: "20px",
                            top: "7px",
                        }}
                    />
                </section>
                <section style={navItemsStyle}>{items}</section>
            </nav>
        </div>
    );
}

export { MobileNavbar };
