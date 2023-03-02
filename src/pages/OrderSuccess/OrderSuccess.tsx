import React from 'react';
import * as S from 'pages/OrderSuccess/OrderSuccessStyle';
import { useSelector, useDispatch } from 'react-redux';
import { cleanOrderQueue } from 'store/orderQueue';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'store/store';

function OrderSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user);
  const orderQueue = useSelector((state: RootState) => state.orderQueue);
  const products = useSelector((state: RootState) => state.products);

  const openProductPage = (e: React.MouseEvent<HTMLElement>) => {
    navigate(`/product/${e.currentTarget.dataset.id}`);
  };

  const onConfirm = () => {
    dispatch(cleanOrderQueue(null));
    navigate('/');
  };

  return (
    <>
      {orderQueue.map((orderQueue, i) => {
        const time = new Date(orderQueue.time);
        const orderTime = `${time.getFullYear()}-${('00' + (time.getMonth() + 1)).slice(-2)}-${(
          '00' + time.getDate()
        ).slice(-2)} (${('00' + time.getHours()).slice(-2)}:${('00' + time.getMinutes()).slice(-2)}) `;

        return (
          <S.OrderListWrapper key={i}>
            <S.OrderSuccessText>{user.name}님, 주문이 완료되었습니다</S.OrderSuccessText>
            <S.OrderDate>주문일시 : {orderTime}</S.OrderDate>

            <S.OrderProductInfoWrapper>
              {orderQueue.order.map((order) => {
                const findItem = products.find((product) => product.id === order.item);

                return (
                  <S.OrderProductInfoDiv data-id={findItem?.id} onClick={openProductPage} key={order.item}>
                    <S.ProductImg
                      src={findItem?.image}
                      alt="product_image"
                      data-id={findItem?.id}
                      onClick={openProductPage}
                    />
                    <S.ProductInfoDiv data-id={findItem?.id} onClick={openProductPage}>
                      <S.ProductName data-id={findItem?.id} onClick={openProductPage}>
                        {findItem?.name}
                      </S.ProductName>
                      {findItem?.option![0]
                        ? (order.count as { item: number; count: number }[]).map((a, i) => (
                            <S.ProductCount
                              data-id={findItem.id}
                              onClick={openProductPage}
                              key={findItem.option![a.item]}
                            >
                              {i + 1}. {findItem.option![a.item]} - {a.count}개
                            </S.ProductCount>
                          ))
                        : findItem && (
                            <S.ProductCount data-id={findItem.id} onClick={openProductPage}>
                              {`${order.count}개`}
                            </S.ProductCount>
                          )}

                      <S.ProductPrice data-id={findItem?.id} onClick={openProductPage}>
                        {(findItem?.option![0]
                          ? (order.count as { item: number; count: number }[]).reduce((acc, cur) => {
                              return acc + cur.count;
                            }, 0) * findItem.price!
                          : findItem?.price! * (order.count as number)
                        )
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        원
                      </S.ProductPrice>
                    </S.ProductInfoDiv>
                  </S.OrderProductInfoDiv>
                );
              })}
            </S.OrderProductInfoWrapper>

            <S.DeliveryInfoDiv>
              <S.DeliveryInfo name="true">{`수령인 : ${orderQueue.receiverName}`}</S.DeliveryInfo>
              <S.DeliveryInfo>{`연락처 : ${orderQueue.receiverPhone}`}</S.DeliveryInfo>
              <S.DeliveryInfo>
                {`주소 : ${orderQueue.receiverAddress} ${orderQueue.receiverDetailAddress}, (${orderQueue.receiverPostCode})`}
              </S.DeliveryInfo>
              <S.DeliveryInfo>{`배송메모 : ${orderQueue.receiverDeliveryMemo}`}</S.DeliveryInfo>
              <S.ConfirmBtn onClick={onConfirm}>확인</S.ConfirmBtn>
            </S.DeliveryInfoDiv>
          </S.OrderListWrapper>
        );
      })}
    </>
  );
}

export default OrderSuccess;
