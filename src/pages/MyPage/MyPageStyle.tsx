import styled from 'styled-components';

export const TabBtn = styled.button<{ active: boolean }>`
  color: ${(props) => (props.active ? '#ff95be' : 'gray')};
  width: calc(100% / 3);
  border: none;
  border-bottom: ${(props) => (props.active ? '2px solid #ffc1d9' : 'none')};
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  padding: 10px;
  font-size: 14px;
  background-color: #ffe4ee;
`;

export const TabWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const UserInfoWrapper = styled.div`
  width: 100%;
  padding: 20px;
  margin-bottom: 2px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 24px;
  background-color: white;
`;

export const UserImageDiv = styled.div``;

export const UserImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 1px solid #cfcccc;
`;

export const UserInfoDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const WelcomeText = styled.div`
  font-size: 18px;
`;

export const TotalPurchasePrice = styled.div`
  font-size: 14px;
  color: #5b5a5a;
`;
