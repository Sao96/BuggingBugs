import a from "./actions.js"; //actions
import initialState from "./initialstate";
function reducer(prevState = initialState, action) {
    let newState = { ...prevState };
    switch (action.type) {
        case a.MODAL_ACTIVE:
            newState[a.MODAL_ACTIVE] = !newState[a.MODAL_ACTIVE];
            break;
        case a.DISPLAY_SEARCH_FILTER:
            newState[a.DISPLAY_SEARCH_FILTER] = !newState[
                a.DISPLAY_SEARCH_FILTER
            ];
            break;
    }
    console.log("HAHAH", newState);
    return newState;
}

export default reducer;
