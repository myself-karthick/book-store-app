import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        transferOrder: {
            orderId: "",
            orderedPerson: "",
            address: "",
            mobile: "",
            orderStatus: "",
            orderTotal: null,
            orderDate: "",
            deliveredDate: "",
            orderItems: [],
        },
    },
    reducers: {
        setTransferOrder: (state, action) => {
            state.transferOrder = action.payload;
        },
    },
});

export const { setTransferOrder } = orderSlice.actions;
export default orderSlice.reducer;
