import React, { useCallback, useState, createRef } from "react";
import { useSelector } from "react-redux";
import EditProjectIcon from "svg/editproject.svg";
import { DefaultButton } from "buttons";
import { ticketboardFields as tbF } from "fields/ticketboardfields";
import { SpinningLoader } from "util/components/loading";
import { ResRender } from "./components";
import { contextStyles } from "styles";
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

    return (
        <article style={contextStyles.containerStyle}>
            <ResRender res={res} pid={props.pid} />
            <SpinningLoader size={100} loading={processing} />
            <header style={contextStyles.centerBlock}>
                <EditProjectIcon style={contextStyles.svgStyle} />
                <div style={contextStyles.headerTextStyle}>{headerText}</div>
            </header>
            <main style={contextStyles.centerBlock}>
                <section style={{ marginTop: "10px" }}>
                    <input ref={newNameRef} type="text"></input>
                </section>
                <div style={contextStyles.buttonSpace}>
                    <DefaultButton
                        onClick={!processing ? renameButtonHandler : null}
                        text={"Rename"}
                        backgroundColor="green"
                    />
                </div>
            </main>
        </article>
    );
}

export { RenameProject };
