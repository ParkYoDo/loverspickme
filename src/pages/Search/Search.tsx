import React, { useEffect, useState } from 'react';
import * as S from 'pages/Search/SearchStyle';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

function Search() {
  const products = useSelector((state: RootState) => state.products);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(true);
  const skeletonProducts = Array(6).fill(0);

  const search = searchParams.get('keyword');

  const findProducts =
    search === ''
      ? []
      : products.filter((product) =>
          product.name?.toLowerCase().replace(' ', '').includes(search?.toLowerCase().replace(' ', '')!)
        );

  const moveProductPage = (e: React.MouseEvent<HTMLDivElement>) => {
    navigate(`/product/${e.currentTarget.dataset.id}?tab=0`);
  };

  useEffect(() => {
    products.length && setLoading(false);
  }, [products]);

  return (
    <>
      {loading ? (
        <>
          <S.ProductLabel>검색결과</S.ProductLabel>
          <S.ProductWrapper>
            {skeletonProducts.map((_, i) => (
              <S.ProductDiv key={i}>
                <S.ProductSkeletonImage />
                <S.ProductSkeletonName />
                <S.ProductSkeletonPrice />
              </S.ProductDiv>
            ))}
          </S.ProductWrapper>
        </>
      ) : findProducts.length ? (
        <>
          <S.ProductLabel>검색결과</S.ProductLabel>
          <S.ProductWrapper>
            {findProducts &&
              findProducts.map((findProduct) => (
                <S.ProductDiv data-id={findProduct.id} onClick={moveProductPage} key={findProduct.id}>
                  <S.ProductImage src={findProduct.image} alt="product_image" data-id={findProduct.id} />
                  <S.ProductName data-id={findProduct.id}>{findProduct.name}</S.ProductName>
                  <S.ProductPrice data-id={findProduct.id}>{findProduct.price}원</S.ProductPrice>
                </S.ProductDiv>
              ))}
          </S.ProductWrapper>
        </>
      ) : (
        <S.ProductLabel noResult={true}>일치하는 상품이 없습니다</S.ProductLabel>
      )}
    </>
  );
}

export default Search;
