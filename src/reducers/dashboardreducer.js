import a from "actions/dashboardactions.js";
import dashboardInitialState from "initialstates/dashboardinitstate.js";

function dashboardReducer(prevState = dashboardInitialState, action) {
    const newState = { ...prevState };
    switch (
        action.type
        // case a.MODAL_STATE:
        //     newState[a.MODAL_STATE] = action.modalState;
        //     break;
    ) {
    }
    return newState;
}

export { dashboardReducer };
