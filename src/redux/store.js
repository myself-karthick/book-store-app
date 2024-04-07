import { configureStore } from '@reduxjs/toolkit';
import BookSlice from './slice/BookSlice';
import OrderSlice from './slice/OrderSlice';

export const store = configureStore({
    reducer: {
        book: BookSlice,
        order: OrderSlice
    }
});