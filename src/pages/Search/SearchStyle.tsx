import styled from 'styled-components';

export const ProductLabel = styled.div<{ noResult?: boolean }>`
  text-align: center;
  color: #ff95be;
  font-size: 14px;
  margin-top: ${(props) => props.noResult && '350px'};
`;

export const ProductWrapper = styled.div`
  padding: 15px 0;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
`;

export const ProductDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
`;

export const ProductImgae = styled.img`
  width: 100%;
  height: 150px;
`;

export const ProductName = styled.div`
  font-size: 12px;
`;

export const ProductPrice = styled.div`
  color: #ff95be;
`;
