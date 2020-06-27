import React, { useState } from "react";

const SubmitButton = (props) => {
    const [hovered, setHovered] = useState(false);
    const mouseOverHandler = () => {
        setHovered(true);
    };
    const onMouseOutHandler = () => {
        setHovered(false);
    };
    return (
        <div
            style={{
                position: "relative",
                cursor: "pointer",
                right: "50px",
                top: "15px",
                fontFamily: "Montserrat",
                fontSize: "18px",
                color: hovered ? "rgb(187, 235, 252)" : "white",
            }}
            onMouseOver={mouseOverHandler}
            onMouseOut={onMouseOutHandler}
            onClick={props.handler}
        >
            {props.text}
        </div>
    );
};

export { SubmitButton };
