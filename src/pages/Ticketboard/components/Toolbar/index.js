import React from "react";
import { dispatch, useDispatch } from "react-redux";
import SettingsIcon from "svg/settings.svg";
import CycleIcon from "svg/cycle.svg";
import InviteUserIcon from "svg/inviteuser.svg";
import CreateTicketIcon from "svg/createticket.svg";
import { ToolbarItem } from "./components/ToolbarItem";
import { sharedActions } from "actions/sharedactions";
function Toolbar(props) {
    const dispatch = useDispatch();
    const createTicketClickHandler = () => {
        dispatch({ type: sharedActions.PUSH_MODAL_STATE, modalState: 2 });
    };
    const createInviteHandler = () => {
        dispatch({ type: sharedActions.PUSH_MODAL_STATE, modalState: 4 });
    };
    const launchSettingsHandler = () => {
        dispatch({ type: sharedActions.PUSH_MODAL_STATE, modalState: 5 });
    };
    const items = [
        ["New Ticket", CreateTicketIcon, createTicketClickHandler],
        ["Invite User", InviteUserIcon, createInviteHandler],
        ["Settings", SettingsIcon, launchSettingsHandler],
    ].map((Item) => {
        const Svg = Item[1];
        return <ToolbarItem text={Item[0]} Svg={Item[1]} handler={Item[2]} />;
    });

    const containerStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "Didact Gothic",
        fontSize: "20px",
        padding: "0px 20px",
        paddingTop: "7px",
        paddingBottom: "20px",
        width: "480px",
        marginTop: "20px",
        backgroundColor: "rgb(68, 91, 112, 0.3)",
    };
    return (
        <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
            <div style={containerStyle}>{items}</div>
        </div>
    );
}
export { Toolbar };
