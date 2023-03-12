import React, { useEffect, useState } from 'react';
import * as S from 'components/OrderListTab/OrderListTabStyle';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'store/store';

function OrderListTab() {
  const navigate = useNavigate();

  const order = useSelector((state: RootState) => state.user.order);
  const products = useSelector((state: RootState) => state.products);

  const [loading, setLoading] = useState(true);
  const skeletonOrder = Array(3).fill(0);

  const reverseOrder = order?.slice(0).sort((a, b) => {
    if (a.time < b.time) {
      return 1;
    } else return -1;
  });

  const openProductPage = (e: React.MouseEvent<HTMLElement>) => {
    navigate(`/product/${e.currentTarget.dataset.id}`);
  };

  useEffect(() => {
    products.length && setLoading(false);
  }, [products]);

  return (
    <>
      {loading ? (
        skeletonOrder.map((_, i) => (
          <S.OrderListWrapper key={i}>
            <S.OrderDateDiv>
              <S.OrderDate>주문일시 : </S.OrderDate>
            </S.OrderDateDiv>
            <S.OrderProductInfoWrapper>
              <S.OrderProductInfoDiv>
                <S.SkeletonImage />
                <S.ProductInfoDiv>
                  <S.SkeletonText width="180px" />
                  <S.SkeletonText width="50px" />
                  <S.SkeletonText width="100px" />
                </S.ProductInfoDiv>
              </S.OrderProductInfoDiv>
            </S.OrderProductInfoWrapper>
          </S.OrderListWrapper>
        ))
      ) : reverseOrder?.length ? (
        reverseOrder!.map((list, i) => {
          const time = new Date(list.time);
          const curTime = new Date();
          const orderTime = `${time.getFullYear()}-${('00' + (time.getMonth() + 1)).slice(-2)}-${(
            '00' + time.getDate()
          ).slice(-2)} (${('00' + time.getHours()).slice(-2)}:${('00' + time.getMinutes()).slice(-2)}) `;
          const deliveryState: string =
            (curTime.getTime() - time.getTime()) / (1000 * 60 * 60 * 24) >= 3 ? '배송완료' : '배송중';

          return (
            <S.OrderListWrapper key={i} lastOrderList={i + 1 === order!.length}>
              <S.OrderDateDiv>
                <S.OrderDate>주문일시 : {orderTime}</S.OrderDate>
                <S.DeliveryStateBtnDiv>
                  <S.DeliveryStateBtn>{deliveryState}</S.DeliveryStateBtn>
                  <S.DelivertInfoDiv>
                    <S.DeliveryInfo name="true">{`${list.receiverName} (${list.receiverPhone})`}</S.DeliveryInfo>
                    <S.DeliveryInfo>
                      {`(${list.receiverPostCode}) ${list.receiverAddress} ${list.receiverDetailAddress}`}
                    </S.DeliveryInfo>
                    <S.DeliveryInfo>{`배송메모 : ${list.receiverDeliveryMemo}`}</S.DeliveryInfo>
                  </S.DelivertInfoDiv>
                </S.DeliveryStateBtnDiv>
              </S.OrderDateDiv>
              <S.OrderProductInfoWrapper>
                {list.orderQueue.map((orderQueue, i) => {
                  const findItem = products.find((product) => product.id === orderQueue.item);

                  return (
                    <S.OrderProductInfoDiv data-id={findItem?.id} onClick={openProductPage} key={i}>
                      <S.ProductImgDiv>
                        <S.ProductImg
                          src={findItem?.image}
                          alt="product_image"
                          data-id={findItem?.id}
                          onClick={openProductPage}
                        />
                      </S.ProductImgDiv>
                      <S.ProductInfoDiv data-id={findItem?.id} onClick={openProductPage}>
                        <S.ProductName data-id={findItem?.id} onClick={openProductPage}>
                          {findItem?.name}
                        </S.ProductName>
                        {findItem?.option![0]
                          ? typeof orderQueue.count !== 'number' &&
                            orderQueue.count.map((a, i) => (
                              <S.ProductCount
                                data-id={findItem.id}
                                onClick={openProductPage}
                                key={findItem.option![a.item]}
                              >
                                {i + 1}. {findItem.option![a.item]} - {a.count}개
                              </S.ProductCount>
                            ))
                          : findItem !== undefined && (
                              <S.ProductCount data-id={findItem.id} onClick={openProductPage}>
                                {orderQueue.count as number}개
                              </S.ProductCount>
                            )}

                        <S.ProductPrice data-id={findItem?.id} onClick={openProductPage}>
                          {(findItem?.option![0]
                            ? typeof orderQueue.count !== 'number' &&
                              orderQueue.count.reduce((acc, cur) => {
                                return acc + cur.count;
                              }, 0) * findItem?.price!
                            : findItem?.price! * (orderQueue.count as number)
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
            </S.OrderListWrapper>
          );
        })
      ) : (
        <S.EmptyOrderListDiv>
          <S.EmptyOrderListText>주문 내역이 없습니다</S.EmptyOrderListText>
        </S.EmptyOrderListDiv>
      )}
    </>
  );
}

export default OrderListTab;
