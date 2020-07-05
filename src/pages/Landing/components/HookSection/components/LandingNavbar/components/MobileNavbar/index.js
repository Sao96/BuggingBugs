import React, { useState } from "react";
import { Listing } from "./components";
import { navRoutes } from "navRoutes";
import DrawerHandler from "svg/drawerhandler.svg";

function MobileNavbar(props) {
    const [active, setActive] = useState(false);
    const openWidth = 250;
    const padding = 20;
    const drawerButtonOnClick = () => {
        setActive(!active);
    };
    const items = [
        ["Login", navRoutes.login],
        ["Register", navRoutes.register],
    ].map((item) => {
        return (
            <Listing
                padding={padding}
                width={openWidth + "px"}
                text={item[0]}
                route={item[1]}
            />
        );
    });
    const containerStyle = {
        position: "fixed",
        backgroundColor: "rgb(255,255,255,0.98)",
        width: !active ? "0px" : openWidth + "px",
        height: "100%",
        transition: "width 50ms",
        zIndex: "1",
        left: 0,
    };
    return (
        <nav style={containerStyle}>
            <div style={{ paddingTop: "5px", paddingLeft: "5px" }}>
                <DrawerHandler
                    onClick={drawerButtonOnClick}
                    style={{
                        fill: "rgb(0, 196, 255)",
                        width: "30px",
                        height: "30px",
                        position: "relative",
                        left: !active ? "0px" : "200px",
                        transition: "left 50ms",
                    }}
                />
                <section
                    style={{
                        position: "relative",
                        left: !active ? -openWidth - 5 + "px" : "0px",
                        transition: "left 50ms",
                    }}
                >
                    {items}
                </section>
            </div>
        </nav>
    );
}

export { MobileNavbar };
