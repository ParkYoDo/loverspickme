import styled from 'styled-components';

export const OrderListWrapper = styled.div`
  width: fit-content;
  margin: 0 auto;
  margin-top: 70px;
  padding: 14px 18px;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 700px;
  }
  @media screen and (min-width: 1024px) {
    width: 900px;
  }
`;

export const OrderSuccessText = styled.div`
  font-size: 20px;
  text-align: center;
  margin-bottom: 16px;
`;

export const OrderDate = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

export const DeliveryInfoDiv = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
`;

export const DeliveryInfo = styled.div<{ name?: string }>`
  font-size: 12px;
  color: #616060;
  font-weight: ${(props) => props.name && '600'};
`;

export const ConfirmBtn = styled.button`
  position: absolute;
  right: -8px;
  bottom: -8px;
  border: 1px solid #b7b7b7;
  color: gray;
  border-radius: 12px;
  background-color: transparent;
  font-size: 12px;
  padding: 4px 16px;
  &:hover {
    color: #ff8be8;
    border: 1px solid #ff8be8;
  }
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

export const ProductSkeletonImg = styled.div`
  width: 70px;
  height: 70px;
  background-color: #e5e5e5;
  border-radius: 12px;
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

export const ProductSkeletonName = styled.div`
  width: 180px;
  height: 20px;
  background-color: #e5e5e5;
  border-radius: 12px;
`;

export const ProductCount = styled.div`
  font-size: 12px;
  color: #a8a4a4;
  cursor: pointer;
`;

export const ProductSkeletonCount = styled.div`
  width: 60px;
  height: 20px;
  background-color: #e5e5e5;
  border-radius: 12px;
`;

export const ProductPrice = styled.div`
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;

export const ProductSkeletonPrice = styled.div`
  width: 100px;
  height: 20px;
  background-color: #e5e5e5;
  border-radius: 12px;
`;
