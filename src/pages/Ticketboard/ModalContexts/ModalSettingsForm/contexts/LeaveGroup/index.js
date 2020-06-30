import React, { useCallback, useState, createRef } from "react";
import { useSelector } from "react-redux";
import LeaveIcon from "svg/leave.svg";
import { DefaultButton } from "buttons";
import { ticketboardFields } from "fields/ticketboardfields";
import { ResRender } from "./components";
import { postUserLeave } from "apiCalls/BuggingBugs/POST";

function LeaveGroup(props) {
    const [res, setRes] = useState([-1, ""]);
    const pid = useSelector((state) => {
        return state.ticketboard[ticketboardFields.PID];
    });
    const sendLeaveHandler = useCallback(() => {
        postUserLeave(pid, setRes);
    }, [pid, setRes]);
    const svgStyle = {
        height: "130px",
        width: "130px",
        fill: "rgb(180,180,180)",
        position: "relative",
        top: "10px",
    };
    const mainStyle = {
        display: "flex",
        flexWrap: "wrap",
        fontFamily: "didact gothic",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
    };
    return (
        <div style={mainStyle}>
            <ResRender res={res} pid={props.pid} />
            <LeaveIcon style={svgStyle} />
            <div style={{ paddingLeft: "20px" }}>
                Are you sure you want to leave? You will need to be invited back
                to rejoin.
            </div>
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <DefaultButton
                    onClick={sendLeaveHandler}
                    text={"Leave"}
                    backgroundColor="green"
                />
            </div>
        </div>
    );
}
export { LeaveGroup };
