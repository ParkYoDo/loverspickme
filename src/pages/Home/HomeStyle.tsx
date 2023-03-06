import styled from 'styled-components';

export const ProductLabel = styled.h5`
  margin-top: 30px;
  text-align: center;
  font-size: 16px;
  color: #ff95be;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 20px;
    margin-bottom: 12px;
  }
  @media screen and (min-width: 1024px) {
    font-size: 22px;
    margin-bottom: 24px;
  }
`;

export const ProductWrapper = styled.div`
  width: 460px;
  margin: 0 auto;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  grid-row-gap: 12px;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 700px;
    grid-template-columns: repeat(4, 1fr);
    grid-row-gap: 16px;
  }
  @media screen and (min-width: 1024px) {
    width: 900px;
    grid-template-columns: repeat(4, 1fr);
    grid-row-gap: 20px;
  }
`;

export const CarouselDiv = styled.div`
  z-index: 0;
  margin: 0 auto;
  width: 420px;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 680px;
  }
  @media screen and (min-width: 1024px) {
    width: 840px;
  }
`;

export const CarouselImage = styled.img`
  width: 100%;
  height: 280px;
  border-radius: 12px;
  background-color: white;
  padding: 32px;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    height: 340px;
  }
  @media screen and (min-width: 1024px) {
    height: 400px;
  }
`;

export const ProductDiv = styled.div`
  text-align: center;
  width: 130px;
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 140px;
    height: 250px;
  }
  @media screen and (min-width: 1024px) {
    width: 180px;
    height: 300px;
  }
`;

export const ProductImage = styled.img``;

export const ProductName = styled.div`
  font-size: 12px;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 14px;
  }
  @media screen and (min-width: 1024px) {
    font-size: 14px;
  }
`;

export const ProductPrice = styled.div`
  color: #ff95be;
  font-size: 13px;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 15px;
  }
  @media screen and (min-width: 1024px) {
    font-size: 15px;
  }
`;
