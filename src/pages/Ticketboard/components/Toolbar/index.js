import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SettingsIcon from "svg/settings.svg";
import InviteUserIcon from "svg/inviteuser.svg";
import CreateTicketIcon from "svg/createticket.svg";
import { ToolbarItem } from "./components/ToolbarItem";
import { sharedActions } from "actions/sharedactions";
import { ticketboardFields } from "fields/ticketboardfields";
import { useDesktop } from "util/responsive";

function Toolbar(props) {
    const desktop = useDesktop();
    const dispatch = useDispatch();
    const authLevel = useSelector((state) => {
        return state.ticketboard[ticketboardFields.AUTH_LEVEL];
    });
    const createTicketClickHandler = () => {
        dispatch({ type: sharedActions.PUSH_MODAL_STATE, modalState: 2 });
    };
    const createInviteHandler = () => {
        dispatch({ type: sharedActions.PUSH_MODAL_STATE, modalState: 4 });
    };
    const launchSettingsHandler = () => {
        dispatch({ type: sharedActions.PUSH_MODAL_STATE, modalState: 5 });
    };
    let items;
    if (authLevel === 0) {
        items = [
            ["New Ticket", CreateTicketIcon, createTicketClickHandler],
            ["Invite User", InviteUserIcon, createInviteHandler],
            ["Settings", SettingsIcon, launchSettingsHandler],
        ];
    } else {
        items = [["Settings", SettingsIcon, launchSettingsHandler]];
    }

    items = items.map((Item, idx) => {
        const bottomSpace = (
            <span style={{ paddingBottom: desktop ? "0px" : "15px" }} />
        );
        return (
            <>
                <ToolbarItem
                    key={idx}
                    text={Item[0]}
                    Svg={Item[1]}
                    handler={Item[2]}
                />
                {idx !== items.length - 1 ? bottomSpace : <></>}
            </>
        );
    });

    const containerStyle = {
        display: authLevel != -1 ? "flex" : "none",
        flexDirection: desktop ? "row" : "column",
        justifyContent: authLevel === 0 ? "space-between" : "center",
        alignItems: "center",
        fontFamily: "Didact Gothic",
        fontSize: "20px",
        padding: "0px 20px",
        paddingTop: "7px",
        paddingBottom: "20px",
        width: desktop ? (authLevel === 0 ? "480px" : "160px") : "160px",
        marginTop: "20px",
        backgroundColor: "rgb(68, 91, 112, 0.3)",
    };
    return (
        <nav
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
            <div style={containerStyle}>{items}</div>
        </nav>
    );
}
export { Toolbar };
