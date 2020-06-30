import { endpoints as ep } from "apiRoutes/BuggingBugs";

async function postUserDemote(pid, setRes) {
    const endpoint = ep.demoteself + "?pid=" + pid; //subject to change
    const res = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Cache-Control": "no-cache",
        },
        credentials: "include",
        mode: "cors",
        cache: "no-cache",
        redirect: "follow",
    });
    const resStatus = res.status,
        resData = await res.json();
    setRes([resStatus, resData]);
}
export { postUserDemote };
