import { sharedFields } from "fields/sharedfields.js";
const sharedInitialState = {
    [sharedFields.MODAL_STACK]: [],
    [sharedFields.AUTH_LEVEL]: 0,
    [sharedFields.LOGGED_IN]: false,
    [sharedFields.SHOW_NAV]: false,
    [sharedFields.USER_DATA]: {},
};

export { sharedInitialState };
