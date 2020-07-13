import { useMediaQuery } from "react-responsive";

const mobileWidth = 1050;

const useDesktop = () => {
    return useMediaQuery({
        query: `(min-width: ${mobileWidth}px)`,
    });
};

const mediaQueryCustom = (width) => {
    return useMediaQuery({
        query: `(min-width: ${width})`,
    });
};
export { mobileWidth, useDesktop, mediaQueryCustom };
