import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarShow: true,
  sidebarUnfoldable:false
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setSidebarShow: (state, action) => {
      state.sidebarShow = action.payload
    },

    setUnfoldable:(state)=> {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    
    },
  },
});

export const { setSidebarShow, setUnfoldable } = sidebarSlice.actions;
export default sidebarSlice.reducer;