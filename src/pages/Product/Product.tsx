import React from 'react';
import * as S from 'pages/Product/ProductStyle';
import { useParams, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BuyMenu from 'components/BuyMenu/BuyMenu';
import DetailProductTab from 'components/DetailProductTab/DetailProductTab';
import CommentTab from 'components/CommentTab/CommentTab';
import InquiryTab from 'components/InquiryTab/InquiryTab';
import { RootState } from 'store/store';

function Product() {
  let { id } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  let tab: number = Number(searchParams.get('tab') || 0);

  const products = useSelector((state: RootState) => state.products);
  const product = products.find((a) => a.id === id);

  const openTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    searchParams.set('tab', e.currentTarget.value);
    setSearchParams(searchParams);
  };

  return (
    <>
      <BuyMenu product={product!} />
      {/* Main Image */}
      {product && (
        <S.MainImageWrapper>
          <S.MainImage src={product.image} alt={product.name} />
          <S.MainTitle>{product.name}</S.MainTitle>
          <S.MainPrice>{product.price!.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</S.MainPrice>
        </S.MainImageWrapper>
      )}
      {/* Tab */}
      <S.TabWrapper>
        <S.TabBtn active={tab === 0 ? true : false} value="0" onClick={openTab}>
          상세정보
        </S.TabBtn>
        <S.TabBtn active={tab === 1 ? true : false} value="1" onClick={openTab}>
          상품평
        </S.TabBtn>
        <S.TabBtn active={tab === 2 ? true : false} value="2" onClick={openTab}>
          Q&A
        </S.TabBtn>
      </S.TabWrapper>
      {
        [<DetailProductTab product={product!} />, <CommentTab product={product!} />, <InquiryTab product={product!} />][
          tab
        ]
      }
    </>
  );
}

export default Product;
