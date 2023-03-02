import styled from 'styled-components';

export const ShopWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
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

export const ProductLabel = styled.h5`
  text-align: center;
  color: #ff95be;
`;

export const ProductWrapper = styled.div`
  width: 100%;
  padding-top: 15px;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  grid-gap: 10px;
`;

export const ProductDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  height: 200px;
`;

export const ProductImage = styled.img`
  width: 100%;
  cursor: pointer;
`;

export const ProductName = styled.div`
  font-size: 12px;
  cursor: pointer;
`;

export const ProductPrice = styled.div`
  color: #ff95be;
  font-size: 12px;
  cursor: pointer;
`;
