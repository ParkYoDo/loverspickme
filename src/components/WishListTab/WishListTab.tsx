import React, { useEffect, useState } from 'react';
import * as S from 'components/WishListTab/WishListTabStyle';
import { db } from 'service/firebase_config';
import { doc, updateDoc, arrayRemove } from 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { removeWishList } from 'store/user';
import { useNavigate } from 'react-router-dom';
import { SlClose } from 'react-icons/sl';
import { RootState } from 'store/store';

function WishListTab() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);
  const products = useSelector((state: RootState) => state.products);

  const [loading, setLoading] = useState(true);
  const skeletonArray = Array(6).fill(null);

  const moveProductPage = (e: React.MouseEvent<HTMLElement>) => {
    navigate(`/product/${e.currentTarget.dataset.id}`);
  };

  const removeWishItem = async (e: React.MouseEvent<SVGElement>) => {
    const userRef = doc(db, 'users', user.uid!);

    dispatch(removeWishList(e.currentTarget.dataset.id));
    await updateDoc(userRef, {
      wish: arrayRemove(e.currentTarget.dataset.id),
    });
  };

  useEffect(() => {
    products.length && setLoading(false);
  }, [products]);

  return (
    <>
      {loading ? (
        <S.ProductWrapper>
          {skeletonArray.map((_, i) => (
            <S.SkeletonDiv key={i} />
          ))}
        </S.ProductWrapper>
      ) : user.wish?.length ? (
        <S.ProductWrapper>
          {user.wish.map((a) => {
            const findItem = products.find((product) => product.id === a);
            return (
              <S.ProductDiv key={a}>
                <S.RemoveBtn data-id={a}>
                  <SlClose data-id={a} onClick={removeWishItem} />
                </S.RemoveBtn>
                <S.ProductImage
                  src={findItem?.image}
                  alt="product_image"
                  data-id={findItem?.id}
                  onClick={moveProductPage}
                />
                <S.ProductName data-id={findItem?.id} onClick={moveProductPage}>
                  {findItem?.name}
                </S.ProductName>
                <S.ProductPrice data-id={findItem?.id} onClick={moveProductPage}>
                  {`${findItem?.price!.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`}
                </S.ProductPrice>
              </S.ProductDiv>
            );
          })}
        </S.ProductWrapper>
      ) : (
        <S.EmptyOrderListDiv>
          <S.EmptyOrderListText>위시리스트가 없습니다</S.EmptyOrderListText>
        </S.EmptyOrderListDiv>
      )}
    </>
  );
}

export default WishListTab;
