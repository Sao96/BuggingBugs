import React, { createRef, useState, useCallback, useEffect } from "react";
import CreateGroupIcon from "svg/create.svg";
import { useDispatch } from "react-redux";
import { dashboardActions } from "actions/dashboardactions";
import { ResRender, CreateButton } from "./components";
import { postCreateProject } from "apiCalls/BuggingBugs/POST";

function ModalCreateProject(props) {
    const dispatch = useDispatch();
    const [processing, setProcessing] = useState(false);
    const [res, setRes] = useState([-1, ""]);
    const projNameRef = createRef();
    useEffect(() => {
        return () => {
            dispatch({ type: dashboardActions.SET_PROJECTS_MODIFIED });
        };
    }, []);
    const createButtonHandler = useCallback(() => {
        postCreateProject(
            { projName: projNameRef.current.value },
            setRes,
            setProcessing
        );
    }, [projNameRef, setProcessing, setRes]);

    const containerStyle = {
        display: "flex",
        flexWrap: "wrap",
        fontFamily: "didact gothic",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
    };
    const createGroupSvgStyle = {
        height: "130px",
        width: "130px",
        fill: "rgb(180,180,180)",
    };
    return (
        <article style={containerStyle}>
            <ResRender res={res} />
            <CreateGroupIcon style={createGroupSvgStyle} />
            <header>Enter the name of your new BuggingBugs application:</header>
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <input ref={projNameRef} type="text" name="fname"></input>
            </div>
            <CreateButton
                processing={processing}
                onClick={createButtonHandler}
            />
        </article>
    );
}

export { ModalCreateProject };
