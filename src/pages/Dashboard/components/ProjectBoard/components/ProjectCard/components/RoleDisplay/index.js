import React from "react";
import CrownIcon from "svg/crown.svg";

function RoleDisplay(props) {
    const containerStyle = {
        color: "white",
        fontSize: "22px",
        fontFamily: "Didact Gothic",
        height: "50px",
        display: "flex",
        alignItems: "center",
    };

    if (props.authLevel === 0) {
        return (
            <div style={containerStyle}>
                Role: Leader
                <CrownIcon
                    style={{
                        height: "30px",
                        width: "30px",
                        position: "relative",
                        bottom: "1px",
                        left: "7px",
                    }}
                />
            </div>
        );
    }

    return <div style={containerStyle}>Role: Member </div>;
}

export { RoleDisplay };
