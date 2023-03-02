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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  /* gap: 4px; */
  background-color: white;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  padding: 16px;
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
  font-size: 12px;
  color: #f991a1;
  font-weight: 600;
  cursor: pointer;
`;

export const ProductName = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: #494848;
  cursor: pointer;
`;

export const ProductDiv = styled.div`
  height: 270px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  margin: 4px;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  cursor: pointer;
`;
