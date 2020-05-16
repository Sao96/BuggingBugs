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
        case a.FILTER_TS_OPEN:
            newState[a.FILTER_TS_OPEN] = !newState[a.FILTER_TS_OPEN];
            break;
        case a.FILTER_TS_IN_PROGRESS:
            newState[a.FILTER_TS_IN_PROGRESS] = !newState[
                a.FILTER_TS_IN_PROGRESS
            ];
            break;
        case a.FILTER_TS_PENDING_APPROVAL:
            newState[a.FILTER_TS_PENDING_APPROVAL] = !newState[
                a.FILTER_TS_PENDING_APPROVAL
            ];
            break;
        case a.FILTER_TS_CLOSED:
            newState[a.FILTER_TS_CLOSED] = !newState[a.FILTER_TS_CLOSED];
            break;
        case a.CREATE_PROJECT_MODAL_OPEN:
            newState[a.CREATE_PROJECT_MODAL_OPEN] = !newState[
                a.CREATE_PROJECT_MODAL_OPEN
            ];
            break;
        case a.MODAL_REF:
            newState[a.MODAL_REF] = action.modalRef;
            break;
    }
    return newState;
}

export default reducer;
