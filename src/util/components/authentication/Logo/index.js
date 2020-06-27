import React from "react";
import BuggingBugsLogo from "img/buggingbugslogo.png";
const Logo = (props) => {
    return (
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
    );
};

export { Logo };
