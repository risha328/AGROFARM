import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as WishlistService from '../features/wishlist/WishlistService';

export const fetchWishlist = createAsyncThunk('wishlist/fetch', WishlistService.getWishlist);
export const removeWishlist = createAsyncThunk('wishlist/remove', WishlistService.removeWishlistItem);

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlist.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.wishlist;
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(removeWishlist.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item._id !== action.meta.arg);
            });
    }
});

export default wishlistSlice.reducer;
