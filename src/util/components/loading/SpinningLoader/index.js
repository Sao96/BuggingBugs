import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

function SpinningLoader(props) {
    return (
        <div style={props.style ? props.style : {}}>
            <ClipLoader
                size={props.size ? props.size : 150}
                color={props.color ? props.color : "rgb(200,200,200)"}
                loading={props.loading ? props.loading : false}
            />
        </div>
    );
}
export { SpinningLoader };
