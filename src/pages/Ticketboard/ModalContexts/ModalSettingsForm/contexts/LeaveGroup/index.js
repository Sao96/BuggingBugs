import React, { useCallback, useState, createRef } from "react";
import { useSelector } from "react-redux";
import LeaveIcon from "svg/leave.svg";
import { DefaultButton } from "buttons";
import { ticketboardFields } from "fields/ticketboardfields";
import { ResRender } from "./components";
import { SpinningLoader } from "util/components/loading";
import { contextStyles } from "styles";
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

    const headerText =
        "Are you sure you want to leave? You will need to be invited back to rejoin.";

    return (
        <article style={contextStyles.containerStyle}>
            <ResRender res={res} pid={props.pid} />
            <SpinningLoader size={100} loading={processing} />
            <header style={contextStyles.centerBlock}>
                <LeaveIcon style={contextStyles.svgStyle} />
                <div style={contextStyles.headerTextStyle}>{headerText}</div>
            </header>
            <main style={contextStyles.centerBlock}>
                <div style={contextStyles.buttonSpace}>
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
