import { createSlice } from '@reduxjs/toolkit';
import { userState } from 'type/interface';

const initialState: userState = {};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser(state, action) {
      return action.payload;
    },
    logoutUser(state, action) {
      return initialState;
    },
    updateUser(state, action) {
      return { ...state, ...action.payload };
    },
    addCart(state, action) {
      return {
        ...state,
        cart: action.payload.findItem
          ? action.payload.data
          : state.cart
          ? [...state.cart, action.payload.data]
          : [action.payload.data],
      };
    },
    removeCart(state, action) {
      return {
        ...state,
        cart: state.cart && state.cart.filter((a) => !action.payload.includes(a.item)),
      };
    },
    updateCart(state, action) {
      return { ...state, cart: action.payload };
    },
    addWishList(state, action) {
      return state.wish ? { ...state, wish: [...state.wish, action.payload] } : { ...state, wish: [action.payload] };
    },
    removeWishList(state, action) {
      return {
        ...state,
        wish: state.wish && [...state.wish.filter((a) => a !== action.payload)],
      };
    },
    orderProduct(state, action) {
      return {
        ...state,
        cart: action.payload.cart,
        order: state.order ? [...state.order, action.payload.order] : [action.payload.order],
      };
    },
  },
});

export default user;
export const {
  loginUser,
  logoutUser,
  updateUser,
  addCart,
  removeCart,
  updateCart,
  addWishList,
  removeWishList,
  orderProduct,
} = user.actions;
