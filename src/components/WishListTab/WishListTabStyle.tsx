import styled from 'styled-components';

export const EmptyOrderListDiv = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const EmptyOrderListText = styled.div`
  font-size: 14px;
  color: #b1afaf;
`;

export const ProductWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  gap: 8px;
  padding: 12px;
  background-color: white;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    grid-row-gap: 16px;
  }
  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    grid-row-gap: 20px;
  }
`;

export const RemoveBtn = styled.button`
  border: none;
  background-color: transparent;
  font-size: 16px;
  position: absolute;
  top: 2px;
  right: 8px;
  display: none;
  color: gray;
  font-weight: 600;
  &:hover {
    color: #ff639f;
  }
`;

export const ProductPrice = styled.div`
  color: #f991a1;
  font-weight: 600;
  font-size: 13px;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 15px;
  }
  @media screen and (min-width: 1024px) {
    font-size: 15px;
  }
  cursor: pointer;
`;

export const ProductName = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #494848;
  cursor: pointer;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 14px;
  }
  @media screen and (min-width: 1024px) {
    font-size: 14px;
  }
`;

export const ProductDiv = styled.div`
  height: 230px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  gap: 4px;
  padding: 14px 12px;
  position: relative;
  border-radius: 12px;
  &:hover {
    background-color: #ffe4ee;
    ${RemoveBtn} {
      display: block;
    }
    ${ProductName} {
      color: gray;
    }
    ${ProductPrice} {
      color: #f7a7b4;
    }
  }
  border: 1px solid red;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    height: 240px;
  }
  @media screen and (min-width: 1024px) {
    height: 240px;
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  cursor: pointer;
`;
