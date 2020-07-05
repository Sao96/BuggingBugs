import { useMediaQuery } from "react-responsive";

const mobileWidth = 1015;

const useDesktop = () => {
    return useMediaQuery({
        query: `(min-device-width: ${mobileWidth}px)`,
    });
};

const mediaQueryCustom = (width) => {
    return useMediaQuery({
        query: `(min-device-width: ${width})`,
    });
};
export { mobileWidth, useDesktop, mediaQueryCustom };
