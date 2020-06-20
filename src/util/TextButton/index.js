import React, { useState } from "react";

const TextButton = (props) => {
    const [hovered, setHovered] = useState(false);
    const onMouseEnterHandler = () => {
        setHovered(true);
    };
    const onMouseLeaveHandler = () => {
        setHovered(false);
    };
    return (
        <div
            style={{
                color: hovered ? "rgb(187, 235, 252)" : "white",
                cursor: "pointer",
            }}
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
            onClick={props.handler}
        >
            {props.text}
        </div>
    );
};

export { TextButton };
