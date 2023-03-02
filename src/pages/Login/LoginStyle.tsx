import styled from 'styled-components';

export const LoginInput = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #eef1f6;
  border-radius: 12px;
  outline: none;
  padding: 20px;
`;

export const LoginBtn = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  color: white;
  background-color: pink;
  border-radius: 12px;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  font-size: 14px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.16);
    transform: translate(0, -5px);
  }
`;

export const KakaoLoginBtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: rgb(255, 235, 0);
  border-radius: 12px;
  width: 100%;
  height: 40px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;
  img {
    width: 20px;
    height: 20px;
  }
  p {
    margin: 0;
  }
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.16);
    transform: translate(0, -5px);
  }
`;

export const LoginImage = styled.img`
  width: 100%;
  height: 200px;
  border-radius: 12px;
  background-color: white;
  padding: 10px;
  margin-bottom: 30px;
`;

export const LoginForm = styled.form``;

export const SpaceBetweenDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 0;
  font-size: 12px;
  padding: 0 4px;
`;

export const Button = styled.button`
  border: none;
  background-color: transparent;
`;

export const KakaoLoginImage = styled.img``;

export const KakaoLoginText = styled.div``;
