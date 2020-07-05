import React from "react";
import Open from "svg/open.svg";
import Pending from "svg/worker.svg";
import Closed from "svg/closed.svg";

function StatusIcon(props) {
    let Comp;
    switch (props.status) {
        case 0:
            Comp = Open;
            break;
        case 1:
            Comp = Pending;
            break;
        case 2:
            Comp = Closed;
            break;
        default:
            Comp = Open;
    }
    const svgStyle = {
        fill: props.priorityColor,
        width: "50px",
        height: "65px",
    };
    return (
        <span
            style={{
                position: "absolute",
                left: "4.5%",
                top: "73%",
            }}
        >
            <Comp style={svgStyle} />
        </span>
    );
}

export { StatusIcon };
