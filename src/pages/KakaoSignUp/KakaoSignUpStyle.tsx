import styled from 'styled-components';
import DaumPostcode from 'react-daum-postcode';

export const SignUpBlock = styled.form``;

export const ImageUploader = styled.div`
  display: flex;
  justify-content: center;
`;

export const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

export const LoginInputTag = styled.p`
  font-size: 14px;
  margin-top: 20px;
`;

export const LoginInput = styled.input<{ display?: string }>`
  width: 100%;
  height: 40px;
  border: 1px solid #eef1f6;
  outline: none;
  padding: 20px;
  display: ${(props) => props.display === 'false' && 'none'};
`;

export const LoginBtn = styled.button`
  margin-top: 30px;
  width: 100%;
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
