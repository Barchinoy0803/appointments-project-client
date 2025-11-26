import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalType } from "../../types";

export interface ModalState {
    usersModal: ModalType,
    locationModal: ModalType,
    businessModal: ModalType
}

export const defaultModalState = {
    isOpen: false
}

const initialState: ModalState = {
    usersModal: defaultModalState,
    locationModal: defaultModalState,
    businessModal: defaultModalState
}

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setUsersModal(state, action: PayloadAction<ModalType>) {
            state.usersModal = action.payload
        },
        setLocationModal(state, action: PayloadAction<ModalType>) {
            state.locationModal = action.payload
        },
        setBusinessModal(state, action: PayloadAction<ModalType>) {
            state.businessModal = action.payload
        }
    }
})

export const { setUsersModal, setLocationModal, setBusinessModal } = modalSlice.actions
export default modalSlice.reducer