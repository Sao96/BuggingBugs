import React, { useCallback, useState, createRef } from "react";
import { useSelector } from "react-redux";
import ImageIcon from "svg/image.svg";
import { DefaultButton } from "buttons";
import { ticketboardFields as tbF } from "fields/ticketboardfields";
import { SpinningLoader } from "util/components/loading";
import { ResRender } from "./components";
import { contextStyles } from "styles";
import { InputFields } from "util/components/form";
import { ModalTitle } from "util/components/modal";
import { postUpdateGroupImage } from "apiCalls/BuggingBugs/POST";

function ChangeGroupImage(props) {
    const [res, setRes] = useState([-1, ""]);
    const [processing, setProcessing] = useState(false);
    const pid = useSelector((state) => {
        return state.ticketboard[tbF.PID];
    });
    const newImageRef = createRef();
    const renameButtonHandler = useCallback(() => {
        postUpdateGroupImage(
            { img: newImageRef.current.value },
            pid,
            setRes,
            setProcessing
        );
    }, [newImageRef, pid, setRes]);

    const data = [["New Project Image URL", "input", newImageRef]];

    return (
        <article style={contextStyles.containerStyle}>
            <ResRender res={res} pid={props.pid} />
            <SpinningLoader size={100} loading={processing} />
            <header style={contextStyles.centerBlock}>
                <ModalTitle text={"Rename Project"} />
                <ImageIcon style={contextStyles.svgStyle} />
            </header>
            <main style={contextStyles.centerBlock}>
                <InputFields data={data} />

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
export { ChangeGroupImage };
