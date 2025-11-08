import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalType } from "../../types";
// import { defaultModalState } from "../../constants";

export interface ModalState {
    usersModal: ModalType
}

export const defaultModalState = {
    isOpen: false
}

const initialState: ModalState = {
    usersModal: defaultModalState
}

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setUsersModal(state, action: PayloadAction<ModalType>) {
            state.usersModal = action.payload
        }
    }
})

export const { setUsersModal } = modalSlice.actions
export default modalSlice.reducer