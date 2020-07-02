import { dashboardActions } from "actions/dashboardactions.js";
import { dashboardInitialState } from "initialstates/dashboardinitstate.js";
import { dashboardFields } from "fields/dashboardfields.js";

function dashboardReducer(prevState = dashboardInitialState, action) {
    const a = dashboardActions;
    const f = dashboardFields;
    const newState = { ...prevState };
    switch (action.type) {
        case a.SET_PROJECTS:
            action.projects.reverse();
            newState[f.PROJECTS] = action.projects;
            break;
        case a.SET_PROJECTS_MODIFIED:
            newState[f.PROJECTS_MODIFIED] = !newState[f.PROJECTS_MODIFIED];
            break;
        case a.SET_INVITES:
            newState[f.INVITES] = action.invites;
            newState[f.RES_STATUS] = action.resStatus;
            break;
        case a.SET_INVITES_MODIFIED:
            newState[f.INVITES_MODIFIED] = true;
            break;
        case a.RESET_INVITES_STATE:
            newState[f.INVITES_MODIFIED] = false;
            newState[f.INVITES] = [];
            newState[f.RES_STATUS] = -1;
            break;
        case a.REMOVE_INVITE:
            const invites = newState[f.INVITES];
            for (let idx = 0; idx < invites.length; ++idx) {
                if (invites[idx].invId === action.invId) {
                    invites.splice(idx, 1);
                    break;
                }
            }
            break;
        case a.SET_INVITE_BOARD_LOCKED:
            newState[f.INVITE_BOARD_LOCKED] = true;
            break;
        case a.SET_INVITE_BOARD_UNLOCKED:
            newState[f.INVITE_BOARD_LOCKED] = false;
            break;
    }
    return newState;
}

export { dashboardReducer };
