import { createSlice } from '@reduxjs/toolkit';
import { orderQueueState } from 'type/interface';

const initialState: orderQueueState = [];

const orderQueue = createSlice({
  name: 'orderQueue',
  initialState,
  reducers: {
    addOrderQueue(state, action) {
      return [action.payload];
    },
    addSelectOrderQueue(state, action) {
      return action.payload;
    },
    addOrderInfo(state, action) {
      return [action.payload];
    },
    cleanOrderQueue(state, action) {
      return [];
    },
  },
});

export default orderQueue;
export const { addOrderQueue, addSelectOrderQueue, addOrderInfo, cleanOrderQueue } = orderQueue.actions;
