import React, { useCallback, useState, createRef } from "react";
import { useSelector } from "react-redux";
import { domain } from "routes";
import { useHistory, Redirect } from "react-router";
import { ErrorBox } from "util/ErrorBox";
import LeaveIcon from "svg/leave.svg";
import Button from "util/Button.jsx";
import { ticketboardFields } from "fields/ticketboardfields";

async function PushUserLeave(pid, setRes) {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const endpoint = domain + "leaveproject?pid=" + pid; //subject to change
    const res = await fetch(endpoint, {
        method: "POST",
        headers: headers,
        credentials: "include",
        mode: "cors",
        cache: "no-cache",
        redirect: "follow",
    });
    const resStatus = res.status,
        resData = await res.json();
    setRes([resStatus, resData]);
}

const ResRender = (props) => {
    const res = props.res;
    const pid = props.pid;
    switch (res[0]) {
        case 200:
            useHistory().go(); //say invite sent or something
        case 300:
            return <Redirect to={"/login"} />;
        case 400:
            return <ErrorBox text={res[1]} />;
        case 500:
            return <ErrorBox text={res[1]} />;
        default:
            return <></>;
    }
};

function LeaveGroup(props) {
    const [res, setRes] = useState([-1, ""]);
    const pid = useSelector((state) => {
        return state.ticketboard[ticketboardFields.PID];
    });
    const sendLeaveHandler = useCallback(() => {
        PushUserLeave(pid, setRes);
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
                <Button
                    onClick={sendLeaveHandler}
                    text={"Leave"}
                    backgroundColor="green"
                />
            </div>
        </div>
    );
}
export { LeaveGroup };
