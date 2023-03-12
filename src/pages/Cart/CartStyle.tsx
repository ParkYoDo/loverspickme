import styled from 'styled-components';

export const LayOutWrapper = styled.div`
  margin: 0 auto;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 700px;
    display: flex;
    flex-direction: row;
    gap: 24px;
  }
  @media screen and (min-width: 1024px) {
    width: 1000px;
    display: flex;
    flex-direction: row;
    gap: 24px;
  }
`;

export const LayoutLeftDiv = styled.div`
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 440px;
  }
  @media screen and (min-width: 1024px) {
    width: 630px;
  }
`;

export const CheckBoxWrapper = styled.div`
  width: 100%;
  background-color: white;
  padding: 8px 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #c8c8c8;
`;

export const CheckBoxDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 14px;
`;

export const CheckBox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const CheckBoxLabel = styled.label`
  font-size: 16px;
  color: #7e7e7e;
  cursor: pointer;
`;

export const CheckBoxDeleteBtn = styled.button`
  border: 1px solid #c3c2c6;
  background-color: transparent;
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 16px;
  color: gray;
  &:hover,
  &:active {
    border: 1px solid #ff95be;
    color: #ff95be;
  }
`;

export const CartWrapper = styled.div`
  position: relative;
  width: 100%;
  background-color: white;
  border-bottom: 1px solid #c8c8c8;
  padding: 16px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 10px;
`;

export const CartProductWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const CartProductDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 10px;
`;

export const CartProductImage = styled.img`
  width: 70px;
  height: 70px;
  cursor: pointer;
`;

export const CartProductSkeletonImage = styled.div`
  width: 70px;
  height: 70px;
  background-color: #e5e5e5;
  border-radius: 12px;
`;

export const CartProductName = styled.div`
  color: #5d5d5d;
  font-size: 12px;
  cursor: pointer;
`;

export const CartProductSkeletonName = styled.div`
  width: 170px;
  height: 18px;
  background-color: #e5e5e5;
  border-radius: 12px;
`;

export const ProductOption = styled.div`
  font-size: 12px;
  padding: 8px 12px;
  border-top: 1px solid #d2d2d2;
`;

export const ProductOptionDiv = styled.div`
  width: 100%;
  background-color: #f8f8f8;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  ${ProductOption}:nth-of-type(1) {
    border: none;
  }
`;

export const DeleteBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 8px;
  border: none;
  background-color: transparent;
  font-size: 16px;
`;

export const OrderPriceTitleDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #c8c8c8;
  padding-bottom: 10px;
`;

export const OrderPriceTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: black;
`;

export const OrderPriceDetailDiv = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const OrderPriceDetailLineDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const OrderPriceDetailText = styled.div`
  font-size: 14px;
  color: #5d5d5d;
`;

export const CartBtnDiv = styled.div`
  width: 100%;
  margin: 10px 0;
  display: flex;
  flex: row;
  justify-content: space-between;
  gap: 10px;
`;

export const ChangeOptionBtn = styled.button`
  width: 50%;
  height: 40px;
  border: 1px solid #c3c2c6;
  border-radius: 24px;
  background-color: transparent;
  font-size: 14px;
  color: gray;
  &:hover,
  &:active {
    border: 1px solid #ff95be;
    color: #ff95be;
  }
`;

export const PurchaseBtn = styled.button`
  width: 50%;
  height: 40px;
  border: 1px solid #c3c2c6;
  border-radius: 24px;
  background-color: transparent;
  font-size: 14px;
  color: gray;
  &:hover,
  &:active {
    border: 1px solid #ff95be;
    color: #ff95be;
  }
`;

export const EmptyCartWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const EmptyCart = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #aaaaaa;
  border-bottom: 1px solid #aaaaaa;
  padding: 150px 0;
  margin: 50px 0 20px 0;
`;

export const EmptyIcon = styled.div`
  font-size: 64px;
  color: #aaaaaa;
`;

export const EmptyText = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #aaaaaa;
`;

export const MoveShopDiv = styled.div`
  width: 100%;
  text-align: center;
  a {
    color: #484747;
    font-size: 16px;
  }
`;

export const CartBottomWrapper = styled.div`
  background-color: white;
  margin-top: 10px;
  padding: 16px;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    margin-top: 0;
    width: 260px;
    height: 220px;
  }
  @media screen and (min-width: 1024px) {
    margin-top: 0;
    width: 370px;
    height: 220px;
  }
`;

export const DetailPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-bottom: 10px;
  border-bottom: 1px solid #c8c8c8;
`;

export const DetailPriceDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const DetailPriceContent = styled.div`
  font-size: 14px;
  color: #5d5d5d;
`;

export const TotalPriceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 10px;
`;

export const TotalPriceContent = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

export const SelectPurchaseBtn = styled.button`
  margin: 20px 0;
  width: 100%;
  height: 40px;
  border: 1px solid #c3c2c6;
  border-radius: 24px;
  background-color: transparent;
  font-size: 16px;
  color: gray;
  &:hover,
  &:active {
    border: 1px solid #ff95be;
    color: #ff95be;
  }
`;
