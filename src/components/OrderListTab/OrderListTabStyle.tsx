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

export const OrderListWrapper = styled.div<{ lastOrderList?: boolean }>`
  position: relative;
  padding: 14px 18px;
  background-color: white;
  display: flex;
  flex-direction: column;
  margin-bottom: 1px;
  border-bottom-left-radius: ${(props) => props.lastOrderList && '14px'};
  border-bottom-right-radius: ${(props) => props.lastOrderList && '14px'};
`;

export const OrderDateDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const OrderDate = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

export const DelivertInfoDiv = styled.div`
  position: absolute;
  top: 10px;
  right: 80px;
  width: fit-content;
  background-color: white;
  border: 1px solid #b9b9b9;
  border-radius: 12px;
  display: block;
  display: none;
  flex-direction: column;
  padding: 8px 12px;
`;

export const DeliveryInfo = styled.div<{ name?: string }>`
  font-size: 12px;
  color: #616060;
  font-weight: ${(props) => props.name && '600'};
`;

export const DeliveryStateBtnDiv = styled.div`
  &:hover {
    ${DelivertInfoDiv} {
      display: flex;
    }
  }
`;

export const DeliveryStateBtn = styled.button`
  font-size: 13px;
  font-weight: 600;
  color: #fcacb9;
  border: 1px solid #d6d6d6;
  border-radius: 12px;
  background-color: transparent;
  padding: 0px 8px;
  &:hover {
    border: 1px solid #f78c9e;
    color: #f78c9e;
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

export const ProductImgDiv = styled.div``;

export const ProductImg = styled.img`
  width: 70px;
  height: 70px;
  cursor: pointer;
`;

export const SkeletonImage = styled.div`
  width: 70px;
  height: 70px;
  background-color: #d3d3d3;
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

export const SkeletonText = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  height: 20px;
  background-color: #d3d3d3;
  border-radius: 12px;
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
