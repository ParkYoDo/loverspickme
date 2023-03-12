import React, { useState, useEffect } from 'react';
import * as S from 'pages/Home/HomeStyle';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Carousel from 'react-bootstrap/Carousel';
import mainImg from 'image/home/main_img1.png';
import mainImg2 from 'image/home/main_img2.jpeg';
import mainImg3 from 'image/home/main_img3.png';
import { RootState } from 'store/store';

function Home() {
  const products = useSelector((state: RootState) => state.products);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const productSkeleton = Array(6).fill(0);

  const moveProductPage = (e: React.MouseEvent<HTMLElement>) => {
    navigate(`/product/${e.currentTarget.dataset.id}`);
  };

  useEffect(() => {
    products.length && setLoading(false);
  }, [products, loading]);

  return (
    <>
      <S.CarouselDiv>
        <Carousel variant="dark">
          <Carousel.Item interval={5000}>
            <S.CarouselImage src={mainImg} alt="main_img1" />
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <S.CarouselImage src={mainImg2} alt="main_img2" />
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <S.CarouselImage src={mainImg3} alt="main_img3" />
          </Carousel.Item>
        </Carousel>
      </S.CarouselDiv>

      <S.ProductLabel>NEW</S.ProductLabel>
      <S.ProductWrapper>
        {loading
          ? productSkeleton.map((_, i) => (
              <S.ProductDiv key={i}>
                <S.ProductSkeletonImage />
                <S.ProductSkeletonName />
                <S.ProductSkeletonPrice />
              </S.ProductDiv>
            ))
          : products.map(
              (product) =>
                product.new === true && (
                  <S.ProductDiv data-id={product.id} onClick={moveProductPage} key={product.id}>
                    <S.ProductImage src={product.image} alt="asd" data-id={product.id} />
                    <S.ProductName data-id={product.id}>{product.name}</S.ProductName>
                    <S.ProductPrice data-id={product.id}>
                      {product.price!.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                    </S.ProductPrice>
                  </S.ProductDiv>
                )
            )}
      </S.ProductWrapper>

      <S.ProductLabel>BEST</S.ProductLabel>
      <S.ProductWrapper>
        {loading
          ? productSkeleton.map((_, i) => (
              <S.ProductDiv key={i}>
                <S.ProductSkeletonImage />
                <S.ProductSkeletonName />
                <S.ProductSkeletonPrice />
              </S.ProductDiv>
            ))
          : products.map(
              (product) =>
                product.best === true && (
                  <S.ProductDiv data-id={product.id} onClick={moveProductPage} key={product.id}>
                    <S.ProductImage src={product.image} alt="asd" data-id={product.id} />
                    <S.ProductName data-id={product.id}>{product.name}</S.ProductName>
                    <S.ProductPrice data-id={product.id}>
                      {product.price!.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                    </S.ProductPrice>
                  </S.ProductDiv>
                )
            )}
      </S.ProductWrapper>
    </>
  );
}

export default Home;
