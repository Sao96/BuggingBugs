import React from "react";
import { Listing } from "./components/Listing";
function NavList(props) {
    const navStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // justifyContent: "space-between",
        height: "100%",
        backgroundColor: "rgb(10,25,45)",
        borderRight: "rgb(100,100,120) solid 1px",
    };
    const listingDisplays = props.listings.map((listing, idx) => {
        return (
            <Listing
                title={listing}
                active={props.active === idx}
                idx={idx}
                setActive={props.setActive}
            />
        );
    });
    return <nav style={navStyle}>{listingDisplays}</nav>;
}

export { NavList };
