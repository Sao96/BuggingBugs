import React from "react";

function PFPImage(props) {
    return (
        <span style={{ paddingLeft: "10px" }}>
            <img
                style={{
                    height: "40px",
                    width: "40px",
                    borderRadius: "50%",
                }}
                src={props.image}
                alt="The profile picture of the sender"
            />
        </span>
    );
}

export { PFPImage };
