import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    token: string | null;
}

const initialState: UserState = {
    token: null
}

export const userSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string | null>) {
            state.token = action.payload
        },
        logout(state) {
            state.token = null 
        }
    }
})

export const { setToken, logout } = userSlice.actions
export default userSlice.reducer