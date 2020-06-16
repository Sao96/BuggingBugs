import React, { useState } from "react";
import { NavList } from "./components/NavList";

function ContextsMenu(props) {
    const [active, setActive] = useState(0);
    const contexts = props.contexts;
    const contextDisplayStyle = {
        width: "500px",
        height: "500px",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "rgb(10,25,45)",
    };
    return (
        <div
            style={{
                height: "500px",
                display: "flex",
                alignItems: "center",
                // border: "gray solid 1px ",
                boxShadow: "2px 4px 4px 0px rgba(0,0,0,0.75)",
            }}
        >
            <NavList
                listings={contexts.map((item) => {
                    return item[0];
                })}
                active={active}
                setActive={setActive}
            />
            <div style={contextDisplayStyle}>{contexts[active][1]}</div>
        </div>
    );
}
export { ContextsMenu };
