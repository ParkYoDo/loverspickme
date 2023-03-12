import styled from 'styled-components';

export const ProductLabel = styled.div<{ noResult?: boolean }>`
  text-align: center;
  color: #ff95be;
  font-size: 14px;
  margin: 0 auto;
  margin-top: ${(props) => props.noResult && '250px'};
  margin-bottom: 12px;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 16px;
    margin-bottom: 16px;
  }
  @media screen and (min-width: 1024px) {
    font-size: 18px;
    margin-bottom: 20px;
  }
`;

export const ProductWrapper = styled.div`
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

export const ProductImage = styled.img`
  cursor: pointer;
`;

export const ProductSkeletonImage = styled.div`
  background-color: #d3d3d3;
  border-radius: 12px;
  height: 120px;
  margin-bottom: 6px;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    height: 170px;
    margin-bottom: 0;
  }
  @media screen and (min-width: 1024px) {
    height: 220px;
    margin-bottom: 0;
  }
`;

export const ProductName = styled.div`
  font-size: 10px;
  cursor: pointer;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 14px;
  }
  @media screen and (min-width: 1024px) {
    font-size: 14px;
  }
`;

export const ProductSkeletonName = styled.div`
  background-color: #d3d3d3;
  border-radius: 12px;
  height: 20px;
  margin-bottom: 6px;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    height: 30px;
    margin-bottom: 0;
  }
  @media screen and (min-width: 1024px) {
    height: 30px;
    margin-bottom: 0;
  }
`;

export const ProductPrice = styled.div`
  cursor: pointer;
  color: #ff95be;
  font-size: 12px;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 15px;
  }
  @media screen and (min-width: 1024px) {
    font-size: 15px;
  }
`;

export const ProductSkeletonPrice = styled.div`
  background-color: #d3d3d3;
  border-radius: 12px;
  height: 14px;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    height: 30px;
  }
  @media screen and (min-width: 1024px) {
    height: 30px;
  }
`;
