import { ACTIONS } from "../../types";

export const getUserModalTitle = (type: ACTIONS) => {
    switch(type) {
        case ACTIONS.CREATE:
            "Create user";
            break;
        case ACTIONS.EDIT: 
            "Edit user";
            break;
        case ACTIONS.DELETE:
            "Delete user";
            break;
    }
}