import styled from 'styled-components';

export const AboutWrapper = styled.div`
  width: 460px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 640px;
  }
  @media screen and (min-width: 1024px) {
    margin-top: 50px;
    width: 900px;
    flex-direction: row;
    align-items: center;
    gap: 24px;
  }
`;

export const AboutImage = styled.img`
  width: 100%;
  height: 500px;
  margin-bottom: 30px;
  @media screen and (min-width: 1024px) {
    margin-bottom: 0;
  }
`;

export const AboutTextDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AboutText = styled.div`
  font-size: 14px;
  text-align: center;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 16px;
  }
  @media screen and (min-width: 1024px) {
    font-size: 18px;
  }
`;
