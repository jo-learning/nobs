// store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';


const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    cartcounter: 0,
    role: "user"
  },
  reducers: {
    setUser(state, action) {
      state.userInfo = action.payload;
    },
    setCartCounter(state, action){
      state.cartcounter = action.payload
    },
    setRole(state, action){
      state.role = action.payload
    },
    clearUser(state) {
      state.userInfo = null;
    },
  },
});

// Export actions
export const { setUser, clearUser, setCartCounter, setRole } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
