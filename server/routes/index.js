import { getRoutesMap } from "./getRoutes";
import { postRoutesMap } from "./postRoutes";

const GETRoutes = [];
Object.values(getRoutesMap).forEach((route) => {
    route.forEach((action) => {
        GETRoutes.push(action);
    });
});

const POSTRoutes = [];
Object.values(postRoutesMap).forEach((route) => {
    route.forEach((action) => {
        POSTRoutes.push(action);
    });
});

export { GETRoutes, POSTRoutes };
