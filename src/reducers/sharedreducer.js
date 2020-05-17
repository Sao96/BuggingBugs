import { sharedActions } from "actions/sharedactions.js";
import { sharedInitialState } from "initialstates/sharedinitialstates.js";

function sharedReducer(prevState = sharedInitialState, action) {
    const newState = { ...prevState };
    switch (action.type) {
        case sharedActions.MODAL_STATE:
            newState[sharedActions.MODAL_STATE] = action.modalState;
    }
    return newState;
}
export { sharedReducer };
