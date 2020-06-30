import React, { useCallback, useState, createRef } from "react";
import { useSelector } from "react-redux";
import EditProjectIcon from "svg/editproject.svg";
import { DefaultButton } from "buttons";
import { ticketboardFields as tbF } from "fields/ticketboardfields";
import { SpinningLoader } from "util/components/loading";
import { ResRender } from "./components";
import { postRename } from "apiCalls/BuggingBugs/POST";

function RenameProject(props) {
    const [res, setRes] = useState([-1, ""]);
    const [processing, setProcessing] = useState(false);
    const pid = useSelector((state) => {
        return state.ticketboard[tbF.PID];
    });
    const newNameRef = createRef();
    const renameButtonHandler = useCallback(() => {
        postRename(
            { projName: newNameRef.current.value },
            pid,
            setRes,
            setProcessing
        );
    }, [newNameRef, pid, setRes]);

    const headerText = "Enter the new name of the project.";
    const svgStyle = {
        height: "130px",
        width: "130px",
        fill: "rgb(180,180,180)",
    };
    const centerBlock = {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
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
        <article style={mainStyle}>
            <ResRender res={res} pid={props.pid} />
            <SpinningLoader size={100} loading={processing} />
            <header style={centerBlock}>
                <EditProjectIcon style={svgStyle} />
                {headerText}
            </header>
            <main style={centerBlock}>
                <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                    <input ref={newNameRef} type="text"></input>
                </div>
                <span style={{ marginTop: "15px" }}></span>
                <DefaultButton
                    onClick={!processing ? renameButtonHandler : null}
                    text={"Rename"}
                    backgroundColor="green"
                />
            </main>
        </article>
    );
}

export { RenameProject };
