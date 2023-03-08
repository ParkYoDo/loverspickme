import styled from 'styled-components';

export const CarouselDiv = styled.div`
  z-index: 0;
  width: 95%;
  margin: 0 auto;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 680px;
  }
  @media screen and (min-width: 1024px) {
    width: 840px;
  }
`;

export const CarouselImage = styled.img`
  width: 100%;
  height: 240px;
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

export const ProductLabel = styled.div`
  margin: 30px 0 10px 0;
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
  margin: 0 auto;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  grid-row-gap: 10px;
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

export const ProductDiv = styled.div`
  text-align: center;
  width: 100px;
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
  font-size: 10px;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 14px;
  }
  @media screen and (min-width: 1024px) {
    font-size: 14px;
  }
`;

export const ProductPrice = styled.div`
  color: #ff95be;
  font-size: 12px;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 15px;
  }
  @media screen and (min-width: 1024px) {
    font-size: 15px;
  }
`;
