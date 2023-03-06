import styled from 'styled-components';

export const ShopWrapper = styled.div`
  width: 460px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 700px;
  }
  @media screen and (min-width: 1024px) {
    width: 900px;
  }
`;

export const SelectSorting = styled.select`
  text-align: center;
  font-size: 14px;
  padding: 2px 0;
  border: none;
  background-color: transparent;
  color: #575656;
  margin-right: 22px;
  outline: none;
`;

export const SelectOption = styled.option`
  background-color: white;
`;

export const ProductWrapper = styled.div`
  width: 460px;
  margin: 0 auto;
  margin-top: 12px;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  grid-row-gap: 12px;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 700px;
    grid-template-columns: repeat(4, 1fr);
    grid-row-gap: 16px;
  }
  @media screen and (min-width: 1024px) {
    width: 900px;
    grid-template-columns: repeat(4, 1fr);
    grid-row-gap: 20px;
  }
`;

export const ProductDiv = styled.div`
  text-align: center;
  width: 130px;
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 140px;
    height: 250px;
  }
  @media screen and (min-width: 1024px) {
    width: 180px;
    height: 300px;
  }
`;

export const ProductImage = styled.img`
  cursor: pointer;
`;

export const ProductName = styled.div`
  cursor: pointer;
  font-size: 12px;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 14px;
  }
  @media screen and (min-width: 1024px) {
    font-size: 14px;
  }
`;

export const ProductPrice = styled.div`
  color: #ff95be;
  font-size: 13px;
  cursor: pointer;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 15px;
  }
  @media screen and (min-width: 1024px) {
    font-size: 15px;
  }
`;
