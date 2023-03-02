import styled from 'styled-components';

export const ProductLabel = styled.h5`
  margin-top: 30px;
  text-align: center;
  font-size: 18px;
  color: #ff95be;
`;

export const ProductWrapper = styled.div`
  padding: 15px 0;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
`;

export const CarouselDiv = styled.div`
  z-index: 0;
`;

export const CarouselImage = styled.img`
  width: 100%;
  height: 280px;
  border-radius: 12px;
  background-color: white;
  padding: 10px;
`;

export const ProductDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 150px;
`;

export const ProductName = styled.div`
  font-size: 12px;
`;

export const ProductPrice = styled.div`
  color: #ff95be;
`;
