import React, { useState, useEffect, useRef } from 'react';
import * as S from 'components/SideMenu/SideMenuStyle';
import { auth } from 'service/firebase_config';
import { signOut } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TfiClose } from 'react-icons/tfi';
import { IoEllipsisVerticalOutline } from 'react-icons/io5';
import { RootState } from 'store/store';

interface Props {
  setSideMenu: React.Dispatch<React.SetStateAction<boolean>>;
  openModifyUserModal: () => void;
}

function SideMenu({ setSideMenu, openModifyUserModal }: Props) {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const [functionModal, setFunctionModal] = useState(false);

  const sideMenuToggle = () => {
    setSideMenu(false);
  };

  const sideMenuRef = useRef(null);

  const openFunctionModal = () => {
    setFunctionModal(!functionModal);
  };

  const moveLoginPage = () => {
    setSideMenu(false);
    navigate('/login');
  };

  const moveAboutPage = () => {
    setSideMenu(false);
    navigate('/about');
  };

  const moveShopPage = () => {
    setSideMenu(false);
    navigate('/shop');
  };

  const moveBoardPage = () => {
    setSideMenu(false);
    navigate('/board');
  };

  const moveContactPage = () => {
    setSideMenu(false);
    navigate('/contact');
  };

  const moveMyPage = () => {
    setSideMenu(false);
    navigate('/mypage');
  };

  const moveCartPage = () => {
    setSideMenu(false);
    navigate('/cart');
  };

  const moveDeliveryPage = () => {
    setSideMenu(false);
    navigate('/mypage?tab=0');
  };

  const moveWishPage = () => {
    setSideMenu(false);
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
        <S.SideMenuWrapper ref={sideMenuRef}>
          {/* ????????? ??? */}
          {Object.keys(user).length !== 0 ? (
            <S.UserInfoWrapper>
              {functionModal && (
                <S.FunctionModal>
                  <S.FunctionDiv onClick={moveMyPage}>???????????????</S.FunctionDiv>
                  <S.FunctionDiv onClick={moveCartPage}>????????????</S.FunctionDiv>
                  <S.FunctionDiv onClick={moveDeliveryPage}>????????????</S.FunctionDiv>
                  <S.FunctionDiv onClick={moveWishPage}>???</S.FunctionDiv>
                  <S.FunctionDiv onClick={onSignOut}>????????????</S.FunctionDiv>
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
            // ???????????? ???
            <S.LoginWrapper onClick={moveLoginPage}>
              <S.LogOutText>???????????? ???????????????.</S.LogOutText>
              <S.LogOutText textBold="true">?????????</S.LogOutText>
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
