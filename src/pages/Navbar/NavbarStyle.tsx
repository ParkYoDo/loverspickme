import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BsHandbag, BsSearch } from 'react-icons/bs';
import { RxHamburgerMenu } from 'react-icons/rx';

export const NavWrapper = styled.div`
  position: fixed;
  padding: 0 20px;
  width: 100%;
  height: 60px;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #cbebee;
  z-index: 2;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
  }
  @media screen and (min-width: 1024px) {
  }
`;

export const NavIcon = styled(RxHamburgerMenu)`
  cursor: pointer;
  font-size: 18px;
  width: 48px;
  &:hover {
    color: #f3659b;
  }
  @media screen and (min-width: 1024px) {
    /* display: none; */
  }
`;

export const RouterLink = styled(Link)`
  @media screen and (min-width: 1024px) {
  }
`;

export const NavLogoImage = styled.img`
  width: 150px;
  height: 30px;
  @media screen and (min-width: 1024px) {
    width: 300px;
    height: 36px;
  }
`;

export const NavMenus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 18px;
  width: 48px;
  @media screen and (min-width: 1024px) {
    font-size: 22px;
  }
`;

export const CartLink = styled(RouterLink)`
  position: relative;
  display: flex;
  color: black;
  &:hover {
    color: #f3659b;
  }
`;
export const CartBtn = styled(BsHandbag)``;

export const CartLength = styled.span`
  position: absolute;
  bottom: -5px;
  right: -5px;
  width: 15px;
  height: 15px;
  font-size: 10px;
  text-align: center;
  background-color: #f3659b;
  border-radius: 50%;
  color: white;
  @media screen and (min-width: 1024px) {
    width: 18px;
    height: 18px;
    font-size: 12px;
    bottom: -8px;
  }
`;

export const SearchBtnDiv = styled.div``;

export const SearchBtn = styled(BsSearch)`
  &:hover {
    color: #f3659b;
  }
`;
