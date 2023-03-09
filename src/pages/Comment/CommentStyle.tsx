import styled from 'styled-components';
import { SlArrowLeft, SlLock } from 'react-icons/sl';

export const CommentWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const ModalTitleDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 9px 12px;
  border-bottom: 1px solid #d6d6d6;
`;

export const CancelBtn = styled(SlArrowLeft)`
  font-size: 16px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const CommentTitle = styled.div`
  font-size: 18px;
`;

export const SubmitBtn = styled.div`
  color: #828282;
  border: 1px solid #c0c0c0;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  &:hover,
  &:active {
    color: #ff95be;
    border: 1px solid #ff95be;
  }
  cursor: pointer;
`;

export const ProductDiv = styled.div`
  padding: 8px 12px;
  font-size: 12px;
  border-bottom: 1px solid #d6d6d6;
`;

export const ProductName = styled.div`
  font-size: 14px;
`;

export const CommentTitleDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
`;

export const CommentTitleInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  padding: 3px 0;
  font-size: 16px;
  ::placeholder {
    font-size: 16px;
    color: #a9a7a7;
  }
`;

export const LockImage = styled(SlLock)`
  border: none;
  background-color: transparent;
  font-size: 18px;
`;
