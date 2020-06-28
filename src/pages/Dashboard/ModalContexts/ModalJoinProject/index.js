import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dashboardActions } from "actions/dashboardactions.js";
import { dashboardFields } from "fields/dashboardfields.js";
import { getGetInvites } from "apiCalls/BuggingBugs/GET";
import { ResRender } from "./components";

function ModalJoinProject(props) {
    const dispatch = useDispatch();
    const res = useSelector((state) => {
        return [
            state.dashboard[dashboardFields.INVITES],
            state.dashboard[dashboardFields.RES_STATUS],
        ];
    });
    useEffect(() => {
        getGetInvites(dispatch);
        return () => {
            dispatch({ type: dashboardActions.RESET_INVITES_STATE });
            dispatch({ type: dashboardActions.SET_PROJECTS_MODIFIED });
        };
    }, []);
    const containerStyle = {
        display: "flex",
        flexWrap: "wrap",
        fontFamily: "didact gothic",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
    };
    const joinGroupSvgStyle = {
        height: "130px",
        width: "130px",
        fill: "rgb(180,180,180)",
    };

    return (
        <div style={containerStyle}>
            <ResRender res={res} />
        </div>
    );
}

export { ModalJoinProject };
