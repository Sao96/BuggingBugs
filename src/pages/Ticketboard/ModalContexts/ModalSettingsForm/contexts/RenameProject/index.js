import React, { useCallback, useState, createRef } from "react";
import { useSelector } from "react-redux";
import EditProjectIcon from "svg/editproject.svg";
import { DefaultButton } from "buttons";
import { ticketboardFields } from "fields/ticketboardfields";
import { ResRender } from "./components";
import { postRename } from "apiCalls/BuggingBugs/POST";

function RenameProject(props) {
    const [res, setRes] = useState([-1, ""]);
    const pid = useSelector((state) => {
        return state.ticketboard[ticketboardFields.PID];
    });
    const newNameRef = createRef();
    const sendProjectNameChangeHandler = useCallback(() => {
        postRename({ projName: newNameRef.current.value }, pid, setRes);
    }, [newNameRef, pid, setRes]);

    const svgStyle = {
        height: "130px",
        width: "130px",
        fill: "rgb(180,180,180)",
    };
    const mainStyle = {
        display: "flex",
        flexWrap: "wrap",
        fontFamily: "didact gothic",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
        marginTop: "8px",
    };
    return (
        <div style={mainStyle}>
            <ResRender res={res} pid={props.pid} />
            <EditProjectIcon style={svgStyle} />
            Enter the new name of the project.
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <input ref={newNameRef} type="text"></input>
            </div>
            <span style={{ marginTop: "15px" }}></span>
            <DefaultButton
                onClick={sendProjectNameChangeHandler}
                text={"Rename"}
                backgroundColor="green"
            />
        </div>
    );
}

export { RenameProject };
