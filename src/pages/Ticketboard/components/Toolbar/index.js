import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SettingsIcon from "svg/settings.svg";
import InviteUserIcon from "svg/inviteuser.svg";
import CreateTicketIcon from "svg/createticket.svg";
import { ToolbarItem } from "./components/ToolbarItem";
import { sharedActions } from "actions/sharedactions";
import { ticketboardFields } from "fields/ticketboardfields";

function Toolbar(props) {
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
        ].map((Item, idx) => {
            return (
                <ToolbarItem
                    key={idx}
                    text={Item[0]}
                    Svg={Item[1]}
                    handler={Item[2]}
                />
            );
        });
    } else {
        items = [["Settings", SettingsIcon, launchSettingsHandler]].map(
            (Item, idx) => {
                return (
                    <ToolbarItem
                        key={idx}
                        text={Item[0]}
                        Svg={Item[1]}
                        handler={Item[2]}
                    />
                );
            }
        );
    }

    const containerStyle = {
        display: authLevel != -1 ? "flex" : "none",
        justifyContent: authLevel === 0 ? "space-between" : "center",
        alignItems: "center",
        fontFamily: "Didact Gothic",
        fontSize: "20px",
        padding: "0px 20px",
        paddingTop: "7px",
        paddingBottom: "20px",
        width: authLevel === 0 ? "480px" : "160px",
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
