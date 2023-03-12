import React, { useState, useEffect } from 'react';
import * as S from 'pages/Shop/ShopStyle';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'store/store';
import { productState } from 'type/interface';

function Shop() {
  const navigate = useNavigate();
  const products = useSelector((state: RootState) => state.products);

  const [totalProducts, setTotalProducts] = useState<productState[]>([]);

  const [loading, setLoading] = useState(true);
  const skeletonProducts = Array(12).fill(0);

  const moveProductPage = (e: React.MouseEvent<HTMLDivElement>) => {
    navigate(`/product/${e.currentTarget.dataset.id}?tab=0`);
  };

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value === 'ascendingName') {
      const newArray = totalProducts.slice(0).sort((a, b) => {
        if (a.name! < b.name!) {
          return -1;
        } else {
          return 1;
        }
      });
      setTotalProducts(newArray);
    } else if (value === 'descendingName') {
      const newArray = totalProducts.slice(0).sort((a, b) => {
        if (a.name! > b.name!) {
          return -1;
        } else {
          return 1;
        }
      });
      setTotalProducts(newArray);
    } else if (value === 'ascendingPrice') {
      const newArray = totalProducts.slice(0).sort((a, b) => a.price! - b.price!);
      setTotalProducts(newArray);
    } else if (value === 'descendingPrice') {
      const newArray = totalProducts.slice(0).sort((a, b) => b.price! - a.price!);
      setTotalProducts(newArray);
    }
  };

  useEffect(() => {
    if (products.length) {
      const newProduct = products.slice(0).sort((a, b) => {
        if (a.name! < b.name!) {
          return -1;
        } else return 1;
      });
      setTotalProducts(newProduct);
      setLoading(false);
    }
  }, [products]);

  return (
    <>
      {/* <S.ShopWrapper> */}
      <S.selectDiv>
        <S.SelectSorting onChange={onChange} defaultValue="ascendingName">
          <S.SelectOption value="ascendingName" defaultValue="true">
            이름순
          </S.SelectOption>
          <S.SelectOption value="descendingName">이름역순</S.SelectOption>
          <S.SelectOption value="ascendingPrice">낮은가격순</S.SelectOption>
          <S.SelectOption value="descendingPrice">높은가격순</S.SelectOption>
        </S.SelectSorting>
      </S.selectDiv>
      <S.ProductWrapper>
        {loading
          ? skeletonProducts.map((_, i) => (
              <S.ProductDiv key={i}>
                <S.ProductSkeletonImage />
                <S.ProductSkeletonName />
                <S.ProductSkeletonPrice />
              </S.ProductDiv>
            ))
          : totalProducts.map((product) => (
              <S.ProductDiv data-id={product.id} onClick={moveProductPage} key={product.id}>
                <S.ProductImage src={product.image} alt="asd" data-id={product.id} />
                <S.ProductName data-id={product.id}>{product.name}</S.ProductName>
                <S.ProductPrice data-id={product.id}>
                  {product.price!.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                </S.ProductPrice>
              </S.ProductDiv>
            ))}
      </S.ProductWrapper>
    </>
  );
}

export default Shop;
