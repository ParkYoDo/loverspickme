import styled from 'styled-components';
import { HiOutlineLockOpen } from 'react-icons/hi2';

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

export const InquiryWrapper = styled.div`
  background-color: white;
  padding: 8px 12px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;
export const BtnDiv = styled.div`
  padding-bottom: 8px;
  border-bottom: 1px solid #bebcbc;
  text-align: right;
`;

export const RegisterQnABtn = styled.button`
  border: 1px solid #c3c2c6;
  border-radius: 16px;
  background-color: transparent;
  color: gray;
  padding: 4px 8px;
  font-size: 12px;
  &:active,
  &:hover,
  &:focus {
    color: #ff95be;
    border: 1px solid #ff95be;
  }
`;

export const InquiryDiv = styled.div`
  border-bottom: 1px solid #bebcbc;
  padding: 16px 20px;
`;

export const InquiryTopDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const InquiryLeftDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const LockImage = styled(HiOutlineLockOpen)`
  font-size: 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const InquiryItem = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #4c4c4c;
`;

export const InquiryWriterName = styled.div`
  font-size: 12px;
  color: #817f7f;
`;

export const InquiryContentDiv = styled.div`
  padding: 8px 12px;
  width: 100%;
  font-size: 12px;
`;

export const InquiryOption = styled.div`
  margin: 8px 0;
  font-size: 14px;
  color: #686666;
`;

export const InquiryContent = styled.div``;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;

  ul.pagination {
    li {
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      a {
        text-decoration: none;
        color: gray;
      }
    }
    li.active {
      background-color: #f6b9d0;
      border-radius: 50%;
      a {
        color: white;
      }
    }
  }
`;
