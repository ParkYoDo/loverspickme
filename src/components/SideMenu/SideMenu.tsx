import React, { useState, useEffect } from 'react';
import * as S from 'components/SideMenu/SideMenuStyle';
import { auth } from 'service/firebase_config';
import { signOut } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TfiClose } from 'react-icons/tfi';
import { IoEllipsisVerticalOutline } from 'react-icons/io5';
import { RootState } from 'store/store';

interface Props {
  sideMenuToggle: () => void;
  openModifyUserModal: () => void;
}

function SideMenu({ sideMenuToggle, openModifyUserModal }: Props) {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const [functionModal, setFunctionModal] = useState(false);

  const openFunctionModal = () => {
    setFunctionModal(!functionModal);
  };

  const moveLoginPage = () => {
    sideMenuToggle();
    navigate('/login');
  };

  const moveAboutPage = () => {
    sideMenuToggle();
    navigate('/about');
  };

  const moveShopPage = () => {
    sideMenuToggle();
    navigate('/shop');
  };

  const moveBoardPage = () => {
    sideMenuToggle();
    navigate('/board');
  };

  const moveContactPage = () => {
    sideMenuToggle();
    navigate('/contact');
  };

  const moveMyPage = () => {
    sideMenuToggle();
    navigate('/mypage');
  };

  const moveCartPage = () => {
    sideMenuToggle();
    navigate('/cart');
  };

  const moveDeliveryPage = () => {
    sideMenuToggle();
    navigate('/mypage?tab=0');
  };

  const moveWishPage = () => {
    sideMenuToggle();
    navigate('/mypage?tab=1');
  };

  const onSignOut = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = `auto`;
    };
  }, []);

  return (
    <>
      {/* SideMenu */}
      <S.BackGroundWrapper>
        <S.CloseBtn onClick={sideMenuToggle}>
          <TfiClose />
        </S.CloseBtn>
        <S.SideMenuWrapper>
          {/* 로그인 시 */}
          {Object.keys(user).length !== 0 ? (
            <S.UserInfoWrapper>
              {functionModal && (
                <S.FunctionModal>
                  <S.FunctionDiv onClick={moveMyPage}>마이페이지</S.FunctionDiv>
                  <S.FunctionDiv onClick={moveCartPage}>장바구니</S.FunctionDiv>
                  <S.FunctionDiv onClick={moveDeliveryPage}>주문배송</S.FunctionDiv>
                  <S.FunctionDiv onClick={moveWishPage}>찜</S.FunctionDiv>
                  <S.FunctionDiv onClick={onSignOut}>로그아웃</S.FunctionDiv>
                </S.FunctionModal>
              )}
              <S.UserInfoTop>
                <S.UserImage src={user.image} alt="user_image" onClick={openModifyUserModal} />
                <S.MoreFunctionBtn onClick={openFunctionModal}>
                  <IoEllipsisVerticalOutline />
                </S.MoreFunctionBtn>
              </S.UserInfoTop>
              <S.UserInfoBottom>
                <S.UserName onClick={openModifyUserModal}>{user.name}</S.UserName>
                <S.UserEmail onClick={openModifyUserModal}>{user.email}</S.UserEmail>
              </S.UserInfoBottom>
            </S.UserInfoWrapper>
          ) : (
            // 로그아웃 시
            <S.LoginWrapper onClick={moveLoginPage}>
              <div>로그인이 필요합니다.</div>
              <div style={{ color: '#838383' }}>로그인</div>
            </S.LoginWrapper>
          )}

          {/* Menu */}
          <S.StoreMenuWrapper>
            <S.StoreMenu onClick={moveAboutPage}>ABOUT LOVERS</S.StoreMenu>
            <S.StoreMenu onClick={moveShopPage}>SHOP</S.StoreMenu>
            <S.StoreMenu onClick={moveBoardPage}>BOARD</S.StoreMenu>
            <S.StoreMenu onClick={moveContactPage}>CONTACT</S.StoreMenu>
          </S.StoreMenuWrapper>
        </S.SideMenuWrapper>
      </S.BackGroundWrapper>
    </>
  );
}

export default SideMenu;
