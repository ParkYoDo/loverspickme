import styled from 'styled-components';
import DaumPostcode from 'react-daum-postcode';

export const SignUpBlock = styled.form`
  width: 460px;
  margin: 0 auto;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 640px;
  }
  @media screen and (min-width: 1024px) {
    width: 720px;
  }
`;

export const ImageUploader = styled.div`
  display: flex;
  justify-content: center;
`;

export const Avatar = styled.img``;

export const LoginInputTag = styled.p`
  font-size: 14px;
  margin-top: 20px;
`;

export const LoginInput = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #eef1f6;
  outline: none;
  padding: 20px;
`;

export const LoginBtnDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const LoginBtn = styled.button`
  margin-top: 30px;
  width: 460px;
  height: 40px;
  border: none;
  color: white;
  background-color: pink;
  border-radius: 12px;
`;

export const ErrorCodeText = styled.span`
  color: red;
  font-size: 12px;
`;

export const DaumPostDiv = styled.div``;

export const DaumPost = styled(DaumPostcode)`
  border: 1px solid black;
  margin-bottom: 5px;
  height: 340px !important;
`;
