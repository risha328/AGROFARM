import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


// Async action to fetch user profile
export const fetchUserProfile = createAsyncThunk(
    'user/fetchUserProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/user/profile', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch profile');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    user : null
}
  
  export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setUserDetails : (state,action)=>{
        state.user = action.payload
      }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setUserDetails } = userSlice.actions
  
  export default userSlice.reducer