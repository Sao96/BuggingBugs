import a from "./actions.js";
const initialState = {
    [a.MODAL_ACTIVE]: null,
    [a.DISPLAY_SEARCH_FILTER]: false,
    [a.FILTER_TS_OPEN]: false,
    [a.FILTER_TS_IN_PROGRESS]: false,
    [a.FILTER_TS_PENDING_APPROVAL]: false,
    [a.FILTER_TS_CLOSED]: false,
};

export default initialState;
