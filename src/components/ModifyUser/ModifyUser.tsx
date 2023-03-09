import React, { useState, useRef, useEffect, RefObject } from 'react';
import * as S from 'components/ModifyUser/ModifyUserStyle';
import { auth, db, storage } from 'service/firebase_config';
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword, updateEmail } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from 'store/user';
import { TfiClose } from 'react-icons/tfi';
import { RootState } from 'store/store';
import Loading from 'components/Loading/Loading';
import onClickOutside from 'utils/onClickOutSide';

interface Props {
  setModifyUserModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface inputInterface {
  image: string | ArrayBuffer;
  currentPassword: string;
  password: string;
  checkPassword: string;
  email: string;
  name: string;
  phone: string;
  postcode: number;
  address: string;
  detailaddress: string;
}

interface errorCodeInterface {
  [key: string]: string;
}

function ModifyUser({ setModifyUserModal }: Props) {
  const fileInput = useRef() as RefObject<HTMLInputElement>;
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const profileImg = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState<inputInterface>({
    image: user.image!,
    currentPassword: '',
    password: '',
    checkPassword: '',
    email: user.email!,
    name: user.name!,
    phone: user.phone!,
    postcode: user.postcode!,
    address: user.address!,
    detailaddress: user.detailaddress!,
  });

  const { currentPassword, password, checkPassword, image, email, name, phone, postcode, address, detailaddress } =
    input;

  const [errorCode, setErrorCode] = useState<errorCodeInterface>({
    currentPasswordErr: '',
    passwordErr: '',
    checkPasswordErr: '',
    emailErr: '',
    nameErr: '',
    phoneErr: '',
    addressErr: '',
    detailAddressErr: '',
  });

  const {
    currentPasswordErr,
    passwordErr,
    checkPasswordErr,
    emailErr,
    nameErr,
    phoneErr,
    addressErr,
    detailAddressErr,
  } = errorCode;

  const closeModifyUserModal = () => {
    setModifyUserModal(false);
  };

  const ClickImage = () => {
    fileInput.current!.click();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'image') {
      const file = (e.target.files as FileList)[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          reader.readyState === 2 && setInput({ ...input, image: reader.result! });
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

  const [daumPost, setDaumPost] = useState(false);
  const daumPostRef = useRef(null);

  const openDaumPostCode = () => {
    setDaumPost(true);
  };

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

  const onModify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailRegex = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    const phoneRegex = /^[0-9\b -]{13}$/;
    const credential = EmailAuthProvider.credential(user.email!, currentPassword);

    if (!currentPassword) {
      setErrorCode({ currentPasswordErr: '기존 비밀번호를 입력하세요' });
    } else {
      // 비밀번호 재인증
      const res = await reauthenticateWithCredential(auth.currentUser!, credential)
        .then(() => {
          return true;
        })
        .catch((err) => {
          return err.code;
        });

      // 비밀번호 인증 오류
      if (res === 'auth/wrong-password') {
        setErrorCode({
          currentPasswordErr: '기존 비밀번호가 일치하지 않습니다',
        });
        // 비밀번호 인증 성공
      } else if (res) {
        if ((password && password.length < 8) || (password && password.length > 12)) {
          setErrorCode({ passwordErr: '비밀번호를 8~12자리로 입력하세요' });
        } else if (currentPassword === password) {
          setErrorCode({ passwordErr: '기존 비밀번호와 동일합니다' });
        } else if (password && !checkPassword) {
          setErrorCode({
            checkPasswordErr: '비밀번호를 한 번 더 입력하세요',
          });
        } else if (password !== checkPassword) {
          setErrorCode({ checkPasswordErr: '비밀번호가 일치하지 않습니다' });
        } else if (!email) {
          // 이메일 입력
          setErrorCode({ emailErr: '이메일을 입력하세요' });
        } else if (!emailRegex.test(email)) {
          // 이메일 형식확인
          setErrorCode({ emailErr: '이메일을 정확히 입력하세요' });
        } else if (!name) {
          // 이름 입력
          setErrorCode({ nameErr: '이름을 입력하세요' });
        } else if (!phone) {
          // 연락처 입력
          setErrorCode({ phoneErr: '전화번호를 입력하세요' });
        } else if (!phoneRegex.test(phone)) {
          // 올바른 전화번호 입력
          setErrorCode({ phoneErr: '올바른 전화번호를 입력하세요' });
        } else if (!address) {
          // 주소 입력
          setErrorCode({ addressErr: '주소를 입력하세요' });
        } else if (!detailaddress) {
          // 상세주소 입력
          setErrorCode({ detailAddressErr: '상세 주소를 입력하세요' });
        } else {
          setLoading(true);
          const userRef = doc(db, 'users', user.uid!);
          let success = true;
          //이미지
          if (image !== user.image) {
            const storageRef = ref(storage, `images/${user.uid}`);
            if (image === profileImg) {
              await updateDoc(userRef, { image });
              dispatch(updateUser({ image }));
            } else {
              await uploadString(storageRef, image as string, 'data_url');
              const url = await getDownloadURL(storageRef);
              await updateDoc(userRef, { image: url });
              dispatch(updateUser({ image: url }));
            }
          } else if (
            // 이름 휴대폰 주소 상세주소
            name !== user.name ||
            phone !== user.phone ||
            address !== user.address ||
            detailaddress !== user.detailaddress
          ) {
            await updateDoc(userRef, {
              name,
              phone,
              postcode,
              address,
              detailaddress,
            });
            dispatch(updateUser({ name, phone, postcode, address, detailaddress }));
          } else if (password && password !== currentPassword) {
            // 비밀번호
            await updatePassword(auth.currentUser!, password);
          } else if (email !== user.email) {
            //이메일
            await updateEmail(auth.currentUser!, email)
              .then(() => {
                dispatch(updateUser({ email }));
              })
              .catch((err) => {
                if (err.code === 'auth/email-already-in-use') {
                  success = false;
                  setErrorCode({ emailErr: '이미 사용 중인 이메일입니다' });
                }
              });
          }
          if (success) {
            setLoading(false);
            setErrorCode({});
            setModifyUserModal(false);
          }
        }
      }
    }
  };

  onClickOutside({ component: daumPost, componentRef: daumPostRef, setState: setDaumPost });

  useEffect(() => {
    document.body.style.overflow = `hidden`;
    return () => {
      document.body.style.overflow = `auto`;
    };
  }, []);

  return (
    <>
      {loading && <Loading />}
      <S.BackGroundWrapper>
        <S.ModifyUserForm onSubmit={onModify}>
          <S.ModifyFormTitle>정보 수정</S.ModifyFormTitle>
          <S.CloseBtn type="button" onClick={closeModifyUserModal}>
            <TfiClose />
          </S.CloseBtn>

          <S.ModifyImageDiv>
            <S.UserImage src={image as string} alt="user_image" onClick={ClickImage} />
            <S.ModifyInput
              type="file"
              style={{ display: 'none' }}
              accept="image/*"
              name="image"
              onChange={onChange}
              ref={fileInput}
            />
          </S.ModifyImageDiv>

          <S.ErrorDiv errorMessage={currentPasswordErr}>
            <S.ModifyInput
              type="password"
              name="currentPassword"
              value={currentPassword}
              placeholder="기존 비밀번호 입력"
              onChange={onChange}
            />
            {currentPasswordErr && <S.ErrorCodeText>{currentPasswordErr}</S.ErrorCodeText>}
          </S.ErrorDiv>

          <S.ErrorDiv errorMessage={passwordErr} style={{ borderTop: 'none', borderBottom: 'none' }}>
            <S.ModifyInput
              type="password"
              name="password"
              value={password}
              placeholder="비밀번호를 변경하는 경우 입력하세요"
              onChange={onChange}
            />
            {passwordErr && <S.ErrorCodeText>{passwordErr}</S.ErrorCodeText>}
          </S.ErrorDiv>

          <S.ErrorDiv errorMessage={checkPasswordErr}>
            <S.ModifyInput
              type="password"
              name="checkPassword"
              value={checkPassword}
              placeholder="비밀번호 확인"
              onChange={onChange}
            />
            {checkPasswordErr && <S.ErrorCodeText>{checkPasswordErr}</S.ErrorCodeText>}
          </S.ErrorDiv>

          <S.ModifyInputTag>* 이메일</S.ModifyInputTag>
          <S.ErrorDiv errorMessage={emailErr}>
            <S.ModifyInput type="text" name="email" value={email} placeholder="이메일" onChange={onChange} />
            {emailErr && <S.ErrorCodeText>{emailErr}</S.ErrorCodeText>}
          </S.ErrorDiv>

          <S.ModifyInputTag>* 이름</S.ModifyInputTag>
          <S.ErrorDiv errorMessage={nameErr}>
            <S.ModifyInput type="text" name="name" value={name} placeholder="이름" onChange={onChange} required />
            {nameErr && <S.ErrorCodeText>{nameErr}</S.ErrorCodeText>}
          </S.ErrorDiv>

          <S.ModifyInputTag>* 연락처</S.ModifyInputTag>
          <S.ErrorDiv errorMessage={phoneErr}>
            <S.ModifyInput
              type="text"
              name="phone"
              value={phone}
              placeholder="연락처"
              maxLength={13}
              onChange={onChange}
            />
            {phoneErr && <S.ErrorCodeText>{phoneErr}</S.ErrorCodeText>}
          </S.ErrorDiv>

          <S.ModifyInputTag>* 주소</S.ModifyInputTag>
          {daumPost ? (
            <S.DaumPostDiv>
              <S.DaumPost
                ref={daumPostRef}
                style={{
                  height: '220px',
                  border: '1px solid black',
                }}
                autoClose
                onComplete={onCompletePost}
              />
            </S.DaumPostDiv>
          ) : (
            <>
              <S.ErrorDiv errorMessage={addressErr} style={{ borderBottom: 'none' }}>
                <S.ModifyInput
                  type="text"
                  name="address"
                  value={address}
                  placeholder="주소"
                  onChange={onChange}
                  onClick={openDaumPostCode}
                  readOnly
                />
                {addressErr && <S.ErrorCodeText>{addressErr}</S.ErrorCodeText>}
              </S.ErrorDiv>
            </>
          )}
          <S.ErrorDiv errorMessage={detailAddressErr}>
            <S.ModifyInput
              type="text"
              name="detailaddress"
              value={detailaddress}
              placeholder="상세 주소"
              onChange={onChange}
            />
            {detailAddressErr && <S.ErrorCodeText>{detailAddressErr}</S.ErrorCodeText>}
          </S.ErrorDiv>

          <S.ModifyBtnDiv>
            <S.ModifyBtn type="submit">확인</S.ModifyBtn>
          </S.ModifyBtnDiv>
        </S.ModifyUserForm>
      </S.BackGroundWrapper>
    </>
  );
}

export default ModifyUser;
