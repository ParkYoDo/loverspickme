import styled from 'styled-components';

export const OrderWrapper = styled.div`
  width: 100%;
`;

export const OrderDiv = styled.div`
  padding: 24px 16px;
  background-color: white;
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;

export const OrderTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

export const OrderProductInfoDiv = styled.div`
  width: 100%;
  padding: 12px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 24px;
  border-bottom: 1px solid #d6d5d5;
`;

export const OrderProductInfoWrapper = styled.div`
  border: 1px solid #d6d5d5;
  margin-top: 12px;
  ${OrderProductInfoDiv}:last-child {
    border-bottom: none;
  }
`;

export const ProductImg = styled.img`
  width: 70px;
  height: 70px;
  cursor: pointer;
`;

export const ProductInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2px;
`;

export const ProductName = styled.div`
  font-size: 14px;
  color: #535252;
  cursor: pointer;
`;

export const ProductCount = styled.div`
  font-size: 12px;
  color: #a8a4a4;
  cursor: pointer;
`;

export const ProductPrice = styled.div`
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;

export const DeliveryCostDiv = styled.div`
  width: 100%;
  border: 1px solid #cbcbcb;
  border-top: none;
  background-color: #f4f3f3;
  text-align: center;
  font-size: 12px;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

export const DeliveryCost = styled.div`
  font-weight: 600;
`;

export const OrdererInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OrdererInfoInput = styled.input<{ errInput: string }>`
  width: 100%;
  height: 40px;
  border: ${(props) => (props.errInput ? '1px solid red' : '1px solid #cbcbcb')};
  outline: none;
  padding: 12px;
  font-size: 14px;
  margin-top: 12px;
  ::placeholder {
    color: #b2b0b0;
  }
`;

export const InputErrDiv = styled.div`
  font-size: 12px;
  color: red;
`;

export const DeliveryInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DeliveryCheckBoxDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

export const DeliveryCheckBoxLabel = styled.label`
  margin-top: 12px;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  cursor: pointer;
`;

export const DeliveryCheckBox = styled.input`
  width: 18px;
  height: 18px;
`;

export const DeliveryInfoInput = styled.input<{ halfWidth?: true }>`
  width: ${(props) => (props.halfWidth ? '50%' : '100%')};
  height: 40px;
  border: 1px solid #cbcbcb;
  outline: none;
  padding: 12px;
  font-size: 14px;
  margin-top: 12px;
  ::placeholder {
    color: #b2b0b0;
  }
`;
export const FlexRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

export const OpenPostCodeBtn = styled.button`
  border: 1px solid #cbcbcb;
  height: 40px;
  margin-top: 12px;
  padding: 8px 16px;
  font-size: 14px;
`;

export const DeliveryMemoDiv = styled.div`
  margin-top: 24px;
`;

export const DeliveryMemoTitle = styled.div`
  font-size: 14px;
`;

export const DeliveryMemoSelect = styled.select`
  width: 100%;
  height: 40px;
  border: 1px solid #cbcbcb;
  font-size: 14px;
  padding: 0 8px;
  outline: none;
  margin-top: 4px;
`;

export const DeliveryMemoOption = styled.option``;

export const OrderSummaryDiv = styled.div`
  background-color: white;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ProductPriceDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-bottom: 1px solid #c8c8c8;
  padding-bottom: 12px;
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

export const TotalPriceContent = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

export const PurchaseBtn = styled.button`
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
