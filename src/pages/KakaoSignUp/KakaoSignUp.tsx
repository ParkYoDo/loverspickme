import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from 'pages/KakaoSignUp/KakaoSignUpStyle';
import { auth, db, storage } from 'service/firebase_config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import onClickOutSide from 'utils/onClickOutSide';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

interface inputInterface {
  uid?: string;
  image?: string;
  email?: string;
  name?: string;
  phone?: string;
  postcode?: number;
  address?: string;
  detailaddress?: string;
}

interface errorCodeInterface {
  nameErr?: string;
  phoneErr?: string;
  addressErr?: string;
  detailAddressErr?: string;
}

function KakaoSignUp() {
  const navigate = useNavigate();
  const fileInput = useRef() as React.MutableRefObject<HTMLInputElement>;
  const profileImg = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

  const kakaoUser = useSelector((state: RootState) => state.kakaoLoginUser);

  const [input, setInput] = useState<inputInterface>({
    uid: '',
    image: profileImg,
    email: '',
    name: '',
    phone: '',
    postcode: 0,
    address: '',
    detailaddress: '',
  });

  const { uid, image, email, name, phone, postcode, address, detailaddress } = input;

  const [errorCode, setErrorCode] = useState<errorCodeInterface>({
    nameErr: '',
    phoneErr: '',
    addressErr: '',
    detailAddressErr: '',
  });

  const { nameErr, phoneErr, addressErr, detailAddressErr } = errorCode;

  const [kakaoImage, setKakaoimage] = useState('');

  // 유저정보 입력받음
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'image') {
      const file = (e.target.files as FileList)[0];
      if (file) {
        // 화면에 프로필 이미지 표시
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          reader.readyState === 2 && setInput({ ...input, image: reader.result as string });
        };
      } else {
        setInput({
          ...input,
          image: profileImg,
        });
        return;
      }
    } else if (name === 'phone' && value.length === 11) {
      setInput({
        ...input,
        [name]: value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      });
    } else if (name === 'phone' && value.length === 13) {
      setInput({
        ...input,
        [name]: value.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  // firebase auth - email, password 회원가입
  const signUpUser = async () => {
    const createdUser = await createUserWithEmailAndPassword(auth, email!, uid!);
    return createdUser.user.uid;
  };

  // firebase storage - profile image 저장
  const upLoadImage = async (uid: string) => {
    const imageRef = ref(storage, `images/${uid}`);
    if (image === kakaoImage || image === profileImg) {
      return image;
    } else {
      await uploadString(imageRef, image!, 'data_url');
      const url = await getDownloadURL(imageRef);
      return url;
    }
  };

  // firebase firestore - userData 저장
  const upLoadUserData = async (uid: string, url: string) => {
    await setDoc(doc(db, 'users', uid), {
      image: url,
      name,
      phone,
      postcode,
      address,
      detailaddress,
    });
  };

  // 회원가입
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const phoneRegex = /^[0-9\b -]{13}$/;
    if (!name) {
      setErrorCode({ nameErr: '이름을 입력하세요.' });
    } else if (!phone) {
      setErrorCode({ phoneErr: '전화번호를 입력하세요.' });
    } else if (!phoneRegex.test(phone)) {
      setErrorCode({ phoneErr: '올바른 전화번호를 입력하세요.' });
    } else if (!address) {
      setErrorCode({ addressErr: '주소를 입력하세요.' });
    } else if (!detailaddress) {
      setErrorCode({ detailAddressErr: '상세 주소를 입력하세요.' });
    } else {
      setErrorCode({});
      const uid = await signUpUser();
      const url = await upLoadImage(uid);
      await upLoadUserData(uid, url!);
      alert('회원가입이 완료되었습니다.');
      setInput({});
      navigate('/login');
    }
  };

  const onClickFileUploader = () => {
    fileInput.current.click();
  };

  const [daumPost, setDaumPost] = useState(false);
  const daumPostRef = useRef(null);
  const openPostCode = () => {
    setDaumPost(!daumPost);
  };

  // 카카오 주소 API
  const onCompletePost = (data: any) => {
    let postcode = Number(data.zonecode);
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? `(${extraAddress})` : '';
    }

    setInput({ ...input, postcode, address: fullAddress });
    setDaumPost(false);
  };

  onClickOutSide({ component: daumPost, componentRef: daumPostRef, setState: setDaumPost });

  const setKakaoUserData = useCallback(() => {
    setKakaoimage(kakaoUser.image!);
    setInput({
      image: kakaoUser.image,
      email: kakaoUser.email,
      name: kakaoUser.name,
      uid: kakaoUser.uid,
      phone: '',
      address: '',
      detailaddress: '',
    });
  }, [kakaoUser]);

  useEffect(() => {
    kakaoUser && setKakaoUserData();
  }, [kakaoUser, setKakaoUserData]);

  return (
    <>
      <S.SignUpBlock onSubmit={onSubmit}>
        <S.ImageUploader>
          <S.Avatar src={image} onClick={onClickFileUploader} />
          <S.LoginInput display="false" type="file" accept="image/*" name="image" onChange={onChange} ref={fileInput} />
        </S.ImageUploader>

        <S.LoginInputTag>* E-mail</S.LoginInputTag>
        <S.LoginInput type="text" name="email" value={email} placeholder="이메일" onChange={onChange} disabled />

        <S.LoginInputTag>* Name</S.LoginInputTag>
        <S.LoginInput type="text" name="name" value={name} placeholder="이름" onChange={onChange} />
        {nameErr && <S.ErrorCodeText>{nameErr}</S.ErrorCodeText>}

        <S.LoginInputTag>* Phone</S.LoginInputTag>
        <S.LoginInput type="text" name="phone" value={phone} placeholder="연락처" onChange={onChange} maxLength={13} />
        {phoneErr && <S.ErrorCodeText>{phoneErr}</S.ErrorCodeText>}

        <S.LoginInputTag>* Address</S.LoginInputTag>
        {daumPost ? (
          <S.DaumPostDiv>
            <S.DaumPost ref={daumPostRef} autoClose onComplete={onCompletePost} />
          </S.DaumPostDiv>
        ) : (
          <S.LoginInput
            type="text"
            name="address"
            value={address}
            placeholder="주소"
            onChange={onChange}
            onClick={openPostCode}
            readOnly
          />
        )}

        <S.LoginInput
          type="text"
          name="detailaddress"
          value={detailaddress}
          placeholder="상세주소"
          onChange={onChange}
        />
        {addressErr && <S.ErrorCodeText>{addressErr}</S.ErrorCodeText>}
        {detailAddressErr && <S.ErrorCodeText>{detailAddressErr}</S.ErrorCodeText>}
        <S.LoginBtnDiv>
          <S.LoginBtn>회원가입</S.LoginBtn>
        </S.LoginBtnDiv>
      </S.SignUpBlock>
    </>
  );
}

export default KakaoSignUp;
