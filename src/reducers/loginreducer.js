import { loginActions } from "actions/loginactions";
import { loginInitialState } from "initialstates/logininitialstate";
import { loginFields } from "fields/loginfields";

function loginReducer(prevState = loginInitialState, action) {
    const a = loginActions;
    const f = loginFields;
    let newState = { ...prevState };
    switch (action.type) {
        case a.SET_ERROR:
            newState[f.ERROR] = action.error;
            break;
    }
    return newState;
}

export { loginReducer };
