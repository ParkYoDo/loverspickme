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
  margin: 0 auto;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  grid-row-gap: 10px;
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

export const ProductDiv = styled.div`
  text-align: center;
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 4px;
  padding-top: 24px;
  overflow: hidden;
  position: relative;
  border-radius: 12px;
  border: 1px solid #dedede;
  &:hover {
    ${RemoveBtn} {
      display: block;
    }
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    padding-top: 28px;
    width: 150px;
    height: 300px;
  }
  @media screen and (min-width: 1024px) {
    padding-top: 32px;
    width: 200px;
    height: 370px;
  }
`;

export const ProductPrice = styled.div`
  color: #f991a1;
  font-weight: 600;
  font-size: 12px;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 15px;
  }
  @media screen and (min-width: 1024px) {
    font-size: 15px;
  }
  cursor: pointer;
`;

export const ProductName = styled.div`
  font-size: 10px;
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

export const ProductImage = styled.img`
  cursor: pointer;
`;
