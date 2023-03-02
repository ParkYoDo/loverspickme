import { createSlice } from '@reduxjs/toolkit';
import { kakaoLoginUserInterface } from 'type/interface';

const initialState: kakaoLoginUserInterface = {};

const kakaoLoginUser = createSlice({
  name: 'kakaoLoginUser',
  initialState,
  reducers: {
    setKakaoUserData(state, action) {
      return action.payload;
    },
  },
});

export default kakaoLoginUser;
export const { setKakaoUserData } = kakaoLoginUser.actions;
