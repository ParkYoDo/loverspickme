import styled from 'styled-components';

export const ContactWrapper = styled.div`
  width: 330px;
  margin: 0 auto;
  background-color: white;
  padding: 30px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 550px;
  }
  @media screen and (min-width: 1024px) {
    width: 700px;
  }
`;

export const ContactTitle = styled.div`
  color: #9edbf3;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 16px;
`;

export const ContactContent = styled.div`
  font-size: 14px;
`;

export const ContactForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

export const ContactLabel = styled.label`
  width: 100%;
  text-align: left;
  font-size: 14px;
`;

export const ContactInput = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 16px;
  padding: 8px 12px;
  border: 1px solid #9edbf3;
  outline: none;
  font-size: 12px;
`;

export const ContactTextArea = styled.textarea`
  width: 100%;
  height: 80px;
  margin-bottom: 16px;
  padding: 8px 12px;
  border: 1px solid #9edbf3;
  outline: none;
  font-size: 12px;
  resize: none;
`;

export const SendBtn = styled.input`
  margin-top: 12px;
  background-color: #9edbf3;
  color: white;
  padding: 8px 16px;
  font-size: 12px;
  border-radius: 14px;
  border: none;
`;
