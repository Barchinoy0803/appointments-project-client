import { ACTIONS } from "../../types";

export const getBusinessTableTitle = (type: ACTIONS) => {
    switch (type) {
        case ACTIONS.CREATE:
            return "Create business";
        case ACTIONS.EDIT:
            return "Update business";
        case ACTIONS.DELETE:
            return "Delete business";
        default:
            break;
    }
}