import React, { useCallback, useState, createRef } from "react";
import { domain } from "routes";
import { useHistory, Redirect } from "react-router";
import InviteUserIcon from "svg/invite2.svg";
import { DefaultButton } from "buttons";
import { postCreateInvite } from "apiCalls/BuggingBugs/POST";
import { ResRender } from "./components";
import { postInvite } from "apiCalls/BuggingBugs/POST";

function ModalCreateInviteForm(props) {
    const [res, setRes] = useState([-1, ""]);
    const toUidInputRef = createRef();
    const sendInviteClickHandler = useCallback(() => {
        postInvite({ to: toUidInputRef.current.value }, props.pid, setRes);
    }, [toUidInputRef]);
    const svgStyle = {
        height: "130px",
        width: "130px",
        fill: "rgb(180,180,180)",
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
            <InviteUserIcon style={svgStyle} />
            Enter the ID of the user to invite.
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <input ref={toUidInputRef} type="text"></input>
            </div>
            <DefaultButton
                onClick={sendInviteClickHandler}
                text={"Send Invite"}
                backgroundColor="green"
            />
        </div>
    );
}

export { ModalCreateInviteForm };

// const createGroupSvgStyle = {
//     height: "130px",
//     width: "130px",
//     fill: "rgb(180,180,180)",
// };
// const projNameRef = createRef();
// const createClickHandler = useCallback(() => {
//     pushProject(projNameRef);
// }, [projNameRef]);
// return (
//     <div style={mainStyle}>
//         <CreateGroupIcon style={createGroupSvgStyle} />
//         Enter the name of your new BuggingBugs application:
//         <div style={{ marginTop: "10px", marginBottom: "10px" }}>
//             <input ref={projNameRef} type="text" name="fname"></input>
//         </div>
//         <DefaultButton
//             onClick={createClickHandler}
//             text={"Create"}
//             backgroundColor="green"
//         />
//     </div>
