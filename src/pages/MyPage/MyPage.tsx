import React from 'react';
import * as S from 'pages/MyPage/MyPageStyle';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OrderListTab from 'components/OrderListTab/OrderListTab';
import WishListTab from 'components/WishListTab/WishListTab';
import PrivateInquiryTab from 'components/PrivateInquiryTab/PrivateInquiryTab';
import { RootState } from 'store/store';

function MyPage() {
  const user = useSelector((state: RootState) => state.user);

  const [searchParams, setSearchParams] = useSearchParams();
  let tab = Number(searchParams.get('tab')) || 0;

  const openTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    searchParams.set('tab', e.currentTarget.dataset.id!);
    setSearchParams(searchParams);
  };

  return (
    <>
      {/* Tab */}
      <S.TabWrapper>
        <S.TabBtn active={tab === 0 ? true : false} data-id="0" onClick={openTab}>
          주문
        </S.TabBtn>
        <S.TabBtn active={tab === 1 ? true : false} data-id="1" onClick={openTab}>
          찜
        </S.TabBtn>
        <S.TabBtn active={tab === 2 ? true : false} data-id="2" onClick={openTab}>
          1:1 문의
        </S.TabBtn>
      </S.TabWrapper>
      <S.UserInfoWrapper>
        <S.UserImageDiv>
          <S.UserImage src={user.image} alt="user_image" />
        </S.UserImageDiv>
        <S.UserInfoDiv>
          <S.WelcomeText>{user.name}님 안녕하세요</S.WelcomeText>
          <S.TotalPurchasePrice>
            누적 구매금액 :
            {user.order?.length
              ? ` ${user.order
                  ?.reduce((acc, cur) => {
                    return acc + cur.price;
                  }, 0)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`
              : ' 0원'}
          </S.TotalPurchasePrice>
        </S.UserInfoDiv>
      </S.UserInfoWrapper>
      {[<OrderListTab />, <WishListTab />, <PrivateInquiryTab />][tab]}
    </>
  );
}

export default MyPage;
