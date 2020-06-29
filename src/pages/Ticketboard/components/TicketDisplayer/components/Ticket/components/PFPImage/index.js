import React from "react";

function PFPImage(props) {
    return (
        <span style={{ paddingLeft: "10px" }}>
            <img
                style={{
                    height: "40px",
                    width: "40px",
                    borderRadius: "50%",
                    borderStyle: "solid",
                    borderColor: "black",
                    borderWidth: "1px",
                }}
                src={props.image}
            />
        </span>
    );
}

export { PFPImage };
