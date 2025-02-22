import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../store";


type QuantityState = {
    quantity: number;
    totalPrice: number;

}

const initialState: QuantityState = {
    quantity: 1,
    totalPrice: 0
}
const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        incraseQuantity: (state) => {
            state.quantity += 1

        },
        decraseQuantity: (state) => {
            state.quantity -= 1

        },

        countTotalPrice: (state, action) => {
            console.log(action.payload)
            state.totalPrice = state.quantity * action.payload;
        },

    },


})


export const { incraseQuantity, decraseQuantity, countTotalPrice } = orderSlice.actions;
export const selectQuantity = (state: RootState) => state.order.quantity;
export const selectTotalPrice = (state: RootState) => state.order.totalPrice;
export default orderSlice.reducer;