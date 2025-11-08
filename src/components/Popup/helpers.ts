import { ACTIONS } from "../../types";

export const getUserModalTitle = (type: ACTIONS) => {
    switch (type) {
        case ACTIONS.CREATE:
            return "Create user";
        case ACTIONS.EDIT:
            return "Update user";
        case ACTIONS.DELETE:
            return "Delete user";
        default:
            break;
    }
}

export const setButtonTitle = (type: ACTIONS) => {
    switch (type) {
        case ACTIONS.CREATE:
            return "Create";
        case ACTIONS.EDIT:
            return "Update";
        case ACTIONS.DELETE:
            return "Delete";
        default:
            break;
    }
}