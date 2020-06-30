import React, { useCallback, useState, createRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import DemoteIcon from "svg/demote.svg";
import { DefaultButton } from "buttons";
import { ticketboardFields } from "fields/ticketboardfields";
import { ResRender } from "./components";
import { postUserDemote } from "apiCalls/BuggingBugs/POST";
function DemoteSelf(props) {
    const dispatch = useDispatch();
    const [res, setRes] = useState([-1, ""]);
    const pid = useSelector((state) => {
        return state.ticketboard[ticketboardFields.PID];
    });
    const sendUserDemoteHandler = useCallback(() => {
        postUserDemote(pid, setRes, dispatch);
    }, [pid]);
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
            <DemoteIcon style={svgStyle} />
            <div style={{ paddingLeft: "20px" }}>
                Are you sure you would like to demote yourself? This cannot be
                undone.
            </div>
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <DefaultButton
                    onClick={sendUserDemoteHandler}
                    text={"Demote"}
                    backgroundColor="green"
                />
            </div>
        </div>
    );
}
export { DemoteSelf };
