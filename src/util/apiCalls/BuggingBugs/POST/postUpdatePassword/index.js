import { endpoints as ep } from "apiRoutes/BuggingBugs";

async function postUpdatePassword(reqData, setRes, setProcessing) {
    setProcessing(true);
    const res = await fetch(ep.updatepassword, {
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
}

export { postUpdatePassword };
