import styled from 'styled-components';

export const FullWidthImage = styled.img`
  width: 100%;
`;

export const SkeletonImage = styled.div`
  width: 100%;
  height: 1200px;
  background-color: #d3d3d3;
  border-radius: 12px;
`;

export const FullWidthImageDiv = styled.div`
  width: 330px;
  margin: 0 auto;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 500px;
  }
  @media screen and (min-width: 1024px) {
    width: 600px;
  }
  ${FullWidthImage}:last-child {
    margin-bottom: 40px;
  }
`;
