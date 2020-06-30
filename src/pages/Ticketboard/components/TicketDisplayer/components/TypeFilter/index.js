import React from "react";
import { TypeTab } from "./components/TypeTab";
function TypeFilter(props) {
    const types = props.types.map((type, idx) => {
        const paddingNeeded = idx !== props.types.length - 1;
        return (
            <div
                key={idx}
                style={{ paddingRight: paddingNeeded ? "10px" : "0px" }}
            >
                <TypeTab
                    type={type[0]}
                    numItems={type[1]}
                    handler={() => {
                        props.setState(idx);
                    }}
                    active={props.active === idx}
                />
            </div>
        );
    });

    const containerStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexFlow: "row wrap",
        marginTop: "25px",
    };
    const headerStyle = {
        fontSize: "26px",
        fontFamily: "Didact Gothic",
        color: "rgb(230,230,230)",
        paddingRight: "15px",
        userSelect: "none",
    };
    return (
        <nav style={containerStyle}>
            <header style={headerStyle}>Show: </header>
            {types}
        </nav>
    );
}
export { TypeFilter };
