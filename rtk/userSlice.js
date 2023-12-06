// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    username: '',
    password: '',
    english: [],
    vietnamese: [],
  },
  reducers: {
    loginUser: (state, action) => {
      const { id, username, password, english, vietnamese } = action.payload;
      return {
        id,
        username,
        password,
        english,
        vietnamese,
      };
    },
    logoutUser: (state) => {
      return {
        id: null,
        username: '',
        password: '',
        english: [],
        vietnamese: [],
      };
    },
    addEnglish: (state, action) => {  
        state.english.push(action.payload)
    },
    addVietnamese: (state, action) => {
      state.vietnamese.push(action.payload)
    }
    
  },
});

export const { loginUser, logoutUser, addEnglish, addVietnamese } = userSlice.actions;
export default userSlice.reducer;


