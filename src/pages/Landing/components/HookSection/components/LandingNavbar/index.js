import React, { useState } from "react";
import { DesktopNavbar } from "./components";
import { MobileNavbar } from "./components";
import { useDesktop } from "util/responsive";

function LandingNavbar(props) {
    if (useDesktop()) {
        return <DesktopNavbar />;
    }
    return <MobileNavbar />;
}

export { LandingNavbar };
