import React from "react";
import { SpinningLoader } from "util/components/loading";

function ProjectsLoadingDisplay(props) {
    if (props.loading) {
        return (
            <SpinningLoader
                size={150}
                color={"rgb(200,200,200)"}
                style={{
                    position: "fixed",
                    left: "50%",
                    top: "25%",
                    zIndex: 1,
                }}
                loading={true}
            />
        );
    }

    return <></>;
}

export { ProjectsLoadingDisplay };
