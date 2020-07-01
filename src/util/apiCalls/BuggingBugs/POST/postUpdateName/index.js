import { endpoints as ep } from "apiRoutes/BuggingBugs";
import { sharedActions } from "actions/sharedactions";

async function postUpdateName(reqData, setRes, setProcessing, dispatch) {
    setProcessing(true);
    const res = await fetch(ep.updateusername, {
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
        body: JSON.stringify(reqData),
    });
    setProcessing(false);
    const resStatus = res.status,
        resData = await res.json();
    setRes([resStatus, resData]);
    //add dispatch
}

export { postUpdateName };
