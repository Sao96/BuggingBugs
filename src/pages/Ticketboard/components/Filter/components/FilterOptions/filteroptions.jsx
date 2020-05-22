import React from "react";
import { ticketboardActions } from "actions/ticketboardactions.js";
import { useDispatch, useSelector } from "react-redux";
function FilterOptions() {
    const mainStyle = {
        display: "flex",
        color: "white",
        fontFamily: "Didact Gothic, Quattrocento Sans",
    };
    const boxItemStyle = {
        marginRight: "10px",
    };
    const selector = (TARGET_FILTER) => {
        useSelector((state) => {
            return state.ticketboard[TARGET_FILTER];
        });
    };
    const filterOptions = [
        ["Open", ticketboardActions.SET_FILTER_TS_OPEN],
        ["In Progress", ticketboardActions.SET_FILTER_TS_IN_PROGRESS],
        ["Pending Approval", ticketboardActions.SET_FILTER_TS_PENDING_APPROVAL],
        ["Closed", ticketboardActions.SET_FILTER_TS_CLOSED],
    ];
    const dispatch = useDispatch();
    const alertStore = (action) => {
        dispatch({ type: action });
    };
    const inputBoxes = filterOptions.map((field) => {
        return (
            <label style={boxItemStyle}>
                <input
                    type="checkbox"
                    onClick={alertStore.bind(null, field[1])}
                    checked={selector(field[1])}
                ></input>
                {field[0]}
            </label>
        );
    });

    return <div style={mainStyle}>{inputBoxes}</div>;
}

export { FilterOptions };
