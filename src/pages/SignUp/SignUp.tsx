import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from 'pages/SignUp/SignUpStyle';
import { auth, db, storage } from 'service/firebase_config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { inputInterface, errorCodeInterface } from 'type/interface';
import onClickOutSide from 'utils/onClickOutSide';

function SignUp() {
  const navigate = useNavigate();
  const fileInput = useRef() as React.MutableRefObject<HTMLInputElement>;
  const profileImg = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

  const [input, setInput] = useState<inputInterface>({
    image: profileImg,
    email: '',
    password: '',
    checkpassword: '',
    name: '',
    phone: '',
    postcode: undefined,
    address: '',
    detailaddress: '',
  });

  const { image, email, password, checkpassword, name, phone, postcode, address, detailaddress } = input;

  const [errorCode, setErrorCode] = useState<errorCodeInterface>({
    emailErr: '',
    passwordErr: '',
    nameErr: '',
    phoneErr: '',
    addressErr: '',
    detailAddressErr: '',
  });

  const { emailErr, passwordErr, nameErr, phoneErr, addressErr, detailAddressErr } = errorCode;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'image') {
      const file = (e.currentTarget.files as FileList)[0];
      if (file) {
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
    const createdUser = await createUserWithEmailAndPassword(auth, email!, password!);
    return createdUser.user.uid;
  };

  // firebase storage - profile image 저장
  const upLoadImage = async (uid: string) => {
    const imageRef = ref(storage, `images/${uid}`);
    if (image !== profileImg) {
      await uploadString(imageRef, image!, 'data_url');
      const url = await getDownloadURL(imageRef);
      return url;
    } else {
      return profileImg;
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
    const emailRegex = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    const phoneRegex = /^[0-9\b -]{13}$/;
    if (!email) {
      setErrorCode({ emailErr: '이메일을 입력하세요.' });
    } else if (!emailRegex.test(email)) {
      setErrorCode({ emailErr: '이메일 형식을 확인하세요.' });
    } else if (!password) {
      setErrorCode({ passwordErr: '비밀번호를 입력하세요.' });
    } else if (password.length < 8 || password.length > 12) {
      setErrorCode({ passwordErr: '비밀번호를 8~12자리로 입력하세요.' });
    } else if (!checkpassword) {
      setErrorCode({ passwordErr: '비밀번호를 한 번 더 입력하세요.' });
    } else if (password !== checkpassword) {
      setErrorCode({ passwordErr: '비밀번호가 일치하지 않습니다!' });
    } else if (!name) {
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
      await upLoadUserData(uid, url);
      alert('회원가입이 완료되었습니다.');
      setInput({});
      navigate('/login');
    }
  };

  const [daumPost, setDaumPost] = useState(false);
  const daumPostRef = useRef(null);
  const openDaumPostCode = () => {
    setDaumPost(!daumPost);
  };

  const onCompletePost = (data: any) => {
    let postcode = data.zonecode;
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

  return (
    <>
      <S.SignUpBlock onSubmit={onSubmit}>
        <S.ImageUploader>
          <S.Avatar
            src={image}
            style={{ width: '130px', height: '130px', borderRadius: '50%' }}
            onClick={() => {
              fileInput.current.click();
            }}
          />
          <S.LoginInput
            type="file"
            style={{ display: 'none' }}
            accept="image/*"
            name="image"
            onChange={onChange}
            ref={fileInput}
          />
        </S.ImageUploader>

        <S.LoginInputTag>* E-mail</S.LoginInputTag>
        <S.LoginInput autoFocus type="text" name="email" value={email} placeholder="이메일" onChange={onChange} />
        {emailErr && <S.ErrorCodeText>{emailErr}</S.ErrorCodeText>}

        <S.LoginInputTag>* Password</S.LoginInputTag>
        <S.LoginInput type="password" name="password" value={password} placeholder="비밀번호" onChange={onChange} />
        <S.LoginInput
          type="password"
          name="checkpassword"
          value={checkpassword}
          placeholder="비밀번호 확인"
          onChange={onChange}
        />
        {passwordErr && <S.ErrorCodeText>{passwordErr}</S.ErrorCodeText>}

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
            onClick={openDaumPostCode}
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

export default SignUp;
