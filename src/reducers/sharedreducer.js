import { sharedActions } from "actions/sharedactions.js";
import { sharedFields } from "fields/sharedfields.js";
import { sharedInitialState } from "initialstates/sharedinitialstates.js";

function sharedReducer(prevState = sharedInitialState, action) {
    const newState = { ...prevState };
    newState.MODAL_STACK = [...prevState.MODAL_STACK]; // need to deep copy.
    switch (action.type) {
        case sharedActions.PUSH_MODAL_STATE:
            newState[sharedFields.MODAL_STACK].push(action.modalState);
            break;
        case sharedActions.POP_MODAL_STATE:
            if (newState[sharedFields.MODAL_STACK].length > 0) {
                newState[sharedFields.MODAL_STACK].pop();
            }
            break;
        case sharedActions.EMPTY_MODAL_STACK:
            newState[sharedFields.MODAL_STACK] = [];
            break;
        case sharedActions.SET_AUTH_LEVEL:
            newState[sharedFields.AUTH_LEVEL] = action.authLevel;
            break;
        case sharedActions.SET_LOGGED_IN:
            newState[sharedFields.LOGGED_IN] = action.loggedIn;
            break;
        case sharedActions.TOGGLE_NAV:
            newState[sharedFields.SHOW_NAV] = !newState[sharedFields.SHOW_NAV];
            break;
    }

    return newState;
}
export { sharedReducer };
