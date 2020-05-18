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
    }

    return newState;
}
export { sharedReducer };
