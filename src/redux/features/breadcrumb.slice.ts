import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BreadcrumbItem {
  label: string;
  link?: string | null;
}

interface BreadcrumbState {
  items: BreadcrumbItem[];
}

const initialState: BreadcrumbState = {
  items: [],
};

const breadcrumbSlice = createSlice({
  name: "breadcrumb",
  initialState,
  reducers: {
    setBreadcrumb: (state, action: PayloadAction<BreadcrumbItem[]>) => {
      state.items = action.payload;
    },

    clearBreadcrumb: state => {
      state.items = [];
    },
  },
});

export const { setBreadcrumb, clearBreadcrumb } = breadcrumbSlice.actions;
export default breadcrumbSlice.reducer;
