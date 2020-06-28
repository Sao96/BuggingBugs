import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

function ProjectsLoadingDisplay(props) {
    if (props.loading) {
        return (
            <div
                style={{
                    position: "fixed",
                    left: "50%",
                    top: "25%",
                    zIndex: 1,
                }}
            >
                <ClipLoader
                    size={150}
                    color={"rgb(200,200,200)"}
                    loading={true}
                />
            </div>
        );
    }

    return <></>;
}

export { ProjectsLoadingDisplay };
