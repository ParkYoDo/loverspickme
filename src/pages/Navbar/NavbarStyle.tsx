import styled from 'styled-components';

export const NavWrapper = styled.div`
  position: fixed;
  padding: 0 20px;
  width: 100%;
  height: 60px;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #cbebee;
  z-index: 2;

  @media screen and (max-width: 768px) {
    background-color: pink;
    /* height: 100px; */
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    background-color: red;
  }
  @media screen and (min-width: 1024px) {
    background-color: yellow;
  }
`;

export const NavIcon = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  text-align: left;
  font-size: 18px;
  width: 300px;
  &:hover,
  &:active {
    color: #f3659b;
  }
`;

export const NavLogo = styled.button`
  border: none;
  background-color: transparent;
  width: 300px;
  height: 31px;
  cursor: pointer;
`;

export const NavMenus = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 18px;
  width: 300px;
`;

export const CartBtn = styled.button`
  position: relative;
  background-color: transparent;
  border: none;
  a {
    color: black;
    text-decoration: none;
    &:hover,
    &:active {
      color: #f3659b;
    }
  }
`;

export const CartLength = styled.span`
  position: absolute;
  bottom: -5px;
  right: -5px;
  width: 15px;
  height: 15px;
  font-size: 8px;
  background-color: #f3659b;
  border-radius: 50%;
  color: white;
`;

export const SearchBtn = styled.button`
  background-color: transparent;
  border: none;
  color: black;
  &:hover,
  &:active {
    color: #f3659b;
  }
`;
