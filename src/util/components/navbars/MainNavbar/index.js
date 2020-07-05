import React, { useState, useCallback, createRef } from "react";
import { DesktopNavbar, MobileNavbar } from "./components";
import { useDesktop } from "util/responsive";

function MainNavbar(props) {
    const desktop = useDesktop();
    return desktop ? <DesktopNavbar /> : <MobileNavbar />;
}

export { MainNavbar };
