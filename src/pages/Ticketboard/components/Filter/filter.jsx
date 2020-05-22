import React from "react";
import Button from "util/Button.jsx";
import { useSelector, useDispatch } from "react-redux";
import { ticketboardActions } from "actions/ticketboardactions.js";
import { FilterOptions } from "./components/FilterOptions/filteroptions.jsx";
function Filter(props) {
    const dispatch = useDispatch();
    const handleDisplayClick = (e) => {
        dispatch({ type: ticketboardActions.SET_DISPLAY_SEARCH_FILTER });
    };
    const filterMenuOpen = useSelector((state) => {
        return state["ticketboard"].DISPLAY_SEARCH_FILTER;
    });

    const mainStyle = {
        backgroundColor: "rgb(10, 20, 31)",
        padding: "20px",
        display: filterMenuOpen ? "inline-block" : "none",
        margin: "5px 0px",
    };

    return (
        <div>
            <Button
                onClick={handleDisplayClick}
                backgroundColor={"rgb(10, 20, 31)"}
                text={filterMenuOpen ? "Hide Filters" : "Show Filters"}
            />
            <main style={mainStyle}>
                <FilterOptions />
            </main>
        </div>
    );
}

export { Filter };
