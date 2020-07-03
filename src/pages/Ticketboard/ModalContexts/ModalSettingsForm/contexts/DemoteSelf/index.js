import React, { useCallback, useState, createRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import DemoteIcon from "svg/demote.svg";
import { DefaultButton } from "buttons";
import { ticketboardFields } from "fields/ticketboardfields";
import { ResRender } from "./components";
import { SpinningLoader } from "util/components/loading";
import { contextStyles } from "styles";
import { postUserDemote } from "apiCalls/BuggingBugs/POST";
import { ModalTitle } from "util/components/modal";

function DemoteSelf(props) {
    const dispatch = useDispatch();
    const [res, setRes] = useState([-1, ""]);
    const [processing, setProcessing] = useState(false);
    const pid = useSelector((state) => {
        return state.ticketboard[ticketboardFields.PID];
    });
    const demoteButtonHandler = useCallback(() => {
        postUserDemote(pid, setRes, dispatch, setProcessing);
    }, [pid]);

    const headerText =
        "Are you sure you would like to demote yourself? This cannot be undone.";

    return (
        <article style={contextStyles.containerStyle}>
            <ResRender res={res} />
            <SpinningLoader size={100} loading={processing} />
            <header style={contextStyles.centerBlock}>
                <ModalTitle text={"Demote Self"} />
                <DemoteIcon style={contextStyles.svgStyle} />
                <div style={contextStyles.headerTextStyle}>{headerText}</div>
            </header>
            <main style={contextStyles.centerBlock}>
                <div style={contextStyles.buttonSpace}>
                    <DefaultButton
                        onClick={!processing ? demoteButtonHandler : null}
                        text={"Demote"}
                        backgroundColor="green"
                    />
                </div>
            </main>
        </article>
    );
}
export { DemoteSelf };
