import React from "react";
import { TypeTab } from "./components/TypeTab";
import { useDesktop } from "util/responsive";

function TypeFilter(props) {
    const desktop = useDesktop();
    const types = props.types.map((type, idx) => {
        const paddingNeeded = idx !== props.types.length - 1;
        const spacing = desktop ? (
            <div style={{ paddingRight: "10px" }} />
        ) : (
            <div style={{ paddingBottom: "10px" }} />
        );

        return (
            <>
                <div key={idx}>
                    <TypeTab
                        type={type[0]}
                        numItems={type[1]}
                        handler={() => {
                            props.setState(idx);
                        }}
                        active={props.active === idx}
                    />
                </div>
                {spacing}
            </>
        );
    });

    const containerStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexFlow: desktop ? "row wrap" : "column wrap",
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
