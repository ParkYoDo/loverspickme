import styled from 'styled-components';

export const MainImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 330px;
  margin: 0 auto;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 500px;
  }
  @media screen and (min-width: 1024px) {
    width: 600px;
  }
`;

export const MainImage = styled.img`
  width: 100%;
  height: 400px;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    height: 500px;
  }
  @media screen and (min-width: 1024px) {
    height: 700px;
  }
`;

export const SkeletonMainImage = styled.div`
  width: 330px;
  height: 380px;
  margin-bottom: 12px;
  background-color: #d0d0d0;
  border-radius: 12px;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 500px;
    height: 500px;
  }
  @media screen and (min-width: 1024px) {
    width: 600px;
    height: 700px;
  }
`;

export const MainTitle = styled.div`
  text-align: right;
  margin-top: 15px;
  font-size: 16px;
  font-weight: 700;
`;

export const SkeletonMainTitle = styled.div`
  width: 240px;
  margin-left: auto;
  height: 25px;
  margin-bottom: 12px;
  background-color: #d0d0d0;
  border-radius: 12px;
`;

export const MainPrice = styled.div`
  color: #ff95be;
  text-align: right;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 12px;
`;

export const SkeletonMainPrice = styled.div`
  width: 120px;
  margin-left: auto;
  height: 25px;
  background-color: #d0d0d0;
  border-radius: 12px;
  margin-bottom: 12px;
`;

export const TabBtn = styled.button<{ active: boolean }>`
  color: ${(props) => (props.active ? '#ff95be' : 'gray')};
  width: calc(100% / 3);
  background-color: transparent;
  border: none;
  padding: 10px;
  font-size: 14px;
  &:hover {
    color: #ff95be;
  }
`;

export const TabWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 20px;
  background-color: #ffe4ee;
  border-radius: 16px;
`;
