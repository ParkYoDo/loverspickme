import styled from 'styled-components';
import DaumPostcode from 'react-daum-postcode';

export const BackGroundWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 4;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 8px;
  right: 12px;
  border: none;
  background-color: transparent;
  color: #bababa;
  z-index: 20;
  font-size: 20px;
`;

export const ModifyUserForm = styled.form`
  position: absolute;
  width: 330px;
  height: 90%;
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 520px;
  }
  @media screen and (min-width: 1024px) {
    width: 640px;
  }
`;

export const ModifyFormTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

export const ModifyImageDiv = styled.div`
  width: 100%;
  height: 70px;
  margin: 16px 0;
  display: flex;
  justify-content: center;
`;

export const UserImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  cursor: pointer;
`;

export const ModifyInputTag = styled.p`
  width: 100%;
  margin: 0;
  margin-top: 16px;
  font-size: 14px;
`;

export const ModifyInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 12px 16px;
  border: none;
  font-size: 12px;
  outline: none;
  &::placeholder {
    color: #828282;
  }
`;

export const ModifyBtnDiv = styled.div`
  width: 100%;
  height: 40px;
  margin-top: 20px;
`;

export const ModifyBtn = styled.button`
  width: 100%;
  height: 100%;
  border: 1px solid #c0c0c0;
  background-color: transparent;
  padding: 12px 16px;
  color: #828282;
  font-size: 12px;
  &:hover,
  &:active {
    color: #ff95be;
    border: 1px solid #ff95be;
  }
`;

export const ErrorDiv = styled.div<{ errorMessage: string }>`
  width: 100%;
  border: ${(props) => (props.errorMessage ? '1px solid #ee6a6a' : '1px solid #c0c0c0')};
`;

export const ErrorCodeText = styled.div`
  width: 100%;
  padding: 4px 12px;
  font-size: 12px;
  color: #ee6a6a;
`;

export const DaumPostDiv = styled.div`
  width: 100%;
`;

export const DaumPost = styled(DaumPostcode)`
  border: 1px solid black;
  margin-bottom: 5px;
  height: 200px !important;
`;
