import React from "react";
import BuggingBugsLogo from "img/mainlogo.png";
import { NavLink } from "react-router-dom";
import { navRoutes } from "navRoutes";

const Logo = (props) => {
    return (
        <NavLink to={navRoutes.landing}>
            <div>
                <img
                    alt="BuggingBugs logo, a bug crossed with a code clash between angle brackets"
                    style={{
                        width: "200px",
                        height: "85px",
                    }}
                    src={BuggingBugsLogo}
                />
            </div>
        </NavLink>
    );
};

export { Logo };
