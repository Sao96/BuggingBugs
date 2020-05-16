import a from "./actions.js";
const initialState = {
    [a.DISPLAY_SEARCH_FILTER]: false,
    [a.FILTER_TS_OPEN]: false,
    [a.FILTER_TS_IN_PROGRESS]: false,
    [a.FILTER_TS_PENDING_APPROVAL]: false,
    [a.FILTER_TS_CLOSED]: false,
    [a.CREATE_PROJECT_MODAL_OPEN]: false,
    [a.MODAL_REF]: null,
    [a.MODAL_ACTIVE]: false,
};

export default initialState;
