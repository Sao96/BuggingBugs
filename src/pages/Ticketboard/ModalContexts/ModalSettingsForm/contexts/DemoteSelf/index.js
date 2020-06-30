import React, { useCallback, useState, createRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import DemoteIcon from "svg/demote.svg";
import { DefaultButton } from "buttons";
import { ticketboardFields } from "fields/ticketboardfields";
import { ResRender } from "./components";
import { SpinningLoader } from "util/components/loading";
import { postUserDemote } from "apiCalls/BuggingBugs/POST";

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
    const svgStyle = {
        height: "130px",
        width: "130px",
        fill: "rgb(180,180,180)",
        position: "relative",
        top: "10px",
    };
    const centerBlock = {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    };
    const containerStyle = {
        display: "flex",
        flexWrap: "wrap",
        fontFamily: "didact gothic",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
    };
    return (
        <article style={containerStyle}>
            <ResRender res={res} />
            <SpinningLoader size={100} loading={processing} />
            <header style={centerBlock}>
                <DemoteIcon style={svgStyle} />
                <div style={{ paddingLeft: "20px" }}>
                    Are you sure you would like to demote yourself? This cannot
                    be undone.
                </div>
            </header>
            <main style={centerBlock}>
                <div style={{ marginTop: "10px", marginBottom: "10px" }}>
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
