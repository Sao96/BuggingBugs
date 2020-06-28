import { endpoints as ep } from "apiRoutes/BuggingBugs";
import { dashboardActions as dbA } from "actions/dashboardactions";
async function getGetProjects(setRes, setProjectsLoading, dispatch) {
    setProjectsLoading(true);
    const res = await fetch(ep.getprojects, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Cache-Control": "no-cache",
        },
        credentials: "include",
        mode: "cors",
        redirect: "follow",
    });
    setProjectsLoading(false);
    const resStatus = res.status,
        resData = await res.json();
    setRes([resData, resStatus]);
    if (res.status === 200) {
        dispatch({
            type: dbA.SET_PROJECTS,
            projects: resData.projects,
        });
    }
}

export { getGetProjects };
