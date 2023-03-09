import styled, { keyframes } from 'styled-components';

const translateXAnimation = keyframes`
    from {
        transform: translateX(-300px);
    } to {
        transform: translateX(0);        
    }
`;

export const BackGroundWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 4;
`;

export const CloseBtn = styled.button`
  position: absolute;
  background-color: transparent;
  border: none;
  z-index: 1;
  font-size: 20px;
  color: white;
  left: 308px;
  top: 20px;
`;

export const SideMenuWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 100%;
  top: 0;
  left: 0;
  padding: 20px 20px;
  background-color: #ffe4ee;
  color: #aaabab;
  animation: ${translateXAnimation} 0.3s;
`;

export const MoreFunctionBtn = styled.button`
  border: none;
  background-color: transparent;
  color: #838383;
  font-size: 20px;
`;

export const FunctionModal = styled.div`
  position: absolute;
  background-color: white;
  width: 150px;
  height: 200px;
  right: 10px;
  top: 60px;
  border-radius: 4px;
  box-shadow: 0px 0px 16px -4px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 0px 0px 16px -4px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 0px 16px -4px rgba(0, 0, 0, 0.5);
`;

export const FunctionDiv = styled.button`
  width: 100%;
  height: 20%;
  border: none;
  background-color: transparent;
  font-size: 14px;
  color: #4f4e4e;
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 105px;
`;

export const UserInfoTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
`;

export const UserInfoBottom = styled.div``;

export const UserName = styled.div`
  font-size: 14px;
  color: #838383;
  cursor: pointer;
`;
export const UserEmail = styled.div`
  font-size: 12px;
  cursor: pointer;
`;

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 14px;
  cursor: pointer;
  margin-top: 6px;
`;

export const StoreMenuWrapper = styled.div`
  margin-top: 30px;
  color: #838383;
  font-size: 16px;
`;

export const StoreMenu = styled.div`
  padding: 4px 0;
  cursor: pointer;
`;

export const LogOutText = styled.div<{ textBold?: string }>`
  color: ${(props) => props.textBold && '#838383'};
`;
