import { amiloggedGetRoute } from "./amilogged";
import { getinvitesGetRoute } from "./getinvites";
import { getprojectsGetRoute } from "./getprojects";
import { loadprojectGetRoute } from "./loadproject";
const getRoutesMap = {
    amiloggedGetRoute: amiloggedGetRoute,
    getinvitesGetRoute: getinvitesGetRoute,
    getprojectsGetRoute: getprojectsGetRoute,
    loadprojectGetRoute: loadprojectGetRoute,
};
export { getRoutesMap };
