import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as S from 'pages/Login/LoginStyle';
import { auth } from 'service/firebase_config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import loversLogo from 'image/Login/main_img.png';
import kakaoIcon from 'image/Login/kakao_icon.png';
import axios from 'axios';
import { setKakaoUserData } from 'store/kakaoLoginUser';
import { useDispatch } from 'react-redux';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const authorizeCode = searchParams.get('code');

  const [input, setInput] = useState({ email: '', password: '' });
  const { email, password } = input;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const moveSignUpPage = () => {
    navigate('/signup');
  };

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      alert('이메일을 입력하세요.');
    } else if (!password) {
      alert('비밀번호를 입력하세요.');
    } else {
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-email') {
            alert('잘못된 이메일 또는 비밀번호입니다.');
          }
        });
    }
  };

  const getToken = async (authorizeCode: string) => {
    const body = `grant_type=authorization_code&client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&code=${authorizeCode}`;
    const res = await axios.post('https://kauth.kakao.com/oauth/token', body, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
    return res.data.access_token;
  };

  const getUserData = async (accessToken: string) => {
    const userData = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return userData;
  };

  const onLoginWithKakao = () => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;
    window.location.href = KAKAO_AUTH_URL;
  };

  const checkSignUpUser = useCallback(async () => {
    const accessToken = await getToken(authorizeCode!);
    const userData = await getUserData(accessToken);
    await signInWithEmailAndPassword(auth, userData.data.kakao_account.email, userData.data.id)
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        navigate('/kakaosignup');
        dispatch(
          setKakaoUserData({
            uid: userData.data.id,
            image: userData.data.kakao_account.profile.profile_image_url,
            email: userData.data.kakao_account.email,
            name: userData.data.kakao_account.profile.nickname,
          })
        );
      });
  }, [authorizeCode, navigate, dispatch]);

  useEffect(() => {
    authorizeCode && checkSignUpUser();
  }, [checkSignUpUser, authorizeCode]);

  return (
    <>
      <S.LoginImage src={loversLogo} alt="lovers_logo" />

      <S.LoginForm onSubmit={onLogin}>
        <S.LoginInput autoFocus type="text" name="email" value={email} placeholder="이메일" onChange={onChange} />
        <S.LoginInput type="password" name="password" value={password} placeholder="비밀번호" onChange={onChange} />

        <S.SpaceBetweenDiv>
          <S.Button onClick={moveSignUpPage}>회원가입</S.Button>
          <S.Button>아이디·비밀번호 찾기</S.Button>
        </S.SpaceBetweenDiv>
        <S.LoginBtn>로그인</S.LoginBtn>
      </S.LoginForm>

      <S.KakaoLoginBtn onClick={onLoginWithKakao}>
        <S.KakaoLoginImage src={kakaoIcon} alt="kakaoIcon" />
        <S.KakaoLoginText>카카오 로그인</S.KakaoLoginText>
      </S.KakaoLoginBtn>
    </>
  );
}

export default Login;
