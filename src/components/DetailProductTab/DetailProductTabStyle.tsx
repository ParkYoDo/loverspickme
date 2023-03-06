import styled from 'styled-components';

export const FullWidthImageDiv = styled.div`
  width: 460px;
  margin: 0 auto;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 500px;
  }
  @media screen and (min-width: 1024px) {
    width: 600px;
  }
`;

export const FullWidthImage = styled.img`
  width: 100%;
`;
