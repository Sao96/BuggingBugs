import React, { useCallback, useState, createRef } from "react";
import { useSelector } from "react-redux";
import LeaveIcon from "svg/leave.svg";
import { DefaultButton } from "buttons";
import { ticketboardFields } from "fields/ticketboardfields";
import { ResRender } from "./components";
import { SpinningLoader } from "util/components/loading";
import { postUserLeave } from "apiCalls/BuggingBugs/POST";

function LeaveGroup(props) {
    const [res, setRes] = useState([-1, ""]);
    const [processing, setProcessing] = useState(false);
    const pid = useSelector((state) => {
        return state.ticketboard[ticketboardFields.PID];
    });
    const leaveButtonHandler = useCallback(() => {
        postUserLeave(pid, setRes, setProcessing);
    }, [pid, setRes]);
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
            <ResRender res={res} pid={props.pid} />
            <SpinningLoader size={100} loading={processing} />
            <header style={centerBlock}>
                <LeaveIcon style={svgStyle} />
                <div style={{ paddingLeft: "20px" }}>
                    Are you sure you want to leave? You will need to be invited
                    back to rejoin.
                </div>
            </header>
            <main style={centerBlock}>
                <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                    <DefaultButton
                        onClick={!processing ? leaveButtonHandler : null}
                        text={"Leave"}
                        backgroundColor="green"
                    />
                </div>
            </main>
        </article>
    );
}
export { LeaveGroup };
