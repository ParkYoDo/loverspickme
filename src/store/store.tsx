import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import user from 'store/user';
import products from 'store/products';
import orderQueue from 'store/orderQueue';
import kakaoLoginUser from 'store/kakaoLoginUser';

const reducers = combineReducers({
  user: user.reducer,
  products: products.reducer,
  orderQueue: orderQueue.reducer,
  kakaoLoginUser: kakaoLoginUser.reducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['products', 'kakaoLoginUser'],
  whitelist: ['orderQueue', 'user'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof reducers>;
