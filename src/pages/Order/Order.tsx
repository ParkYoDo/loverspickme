import React, { useState, useEffect } from 'react';
import * as S from 'pages/Order/OrderStyle';
import { useSelector, useDispatch } from 'react-redux';
import DaumPostcodeModal from 'components/DaumPostcodeModal/DaumPostcodeModal';
import { db } from 'service/firebase_config';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { orderProduct } from 'store/user';
import { addOrderInfo } from 'store/orderQueue';
import { RootState } from 'store/store';
import { receiverInfoInterface } from 'type/interface';
import Loading from 'components/Loading/Loading';

function Order() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);
  const orderQueue = useSelector((state: RootState) => state.orderQueue);
  const products = useSelector((state: RootState) => state.products);

  const [searchParams] = useSearchParams();
  const isInCart = searchParams.get('cart');

  const [loading, setLoading] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [ordererInfo, setOrdererInfo] = useState({
    ordererName: '',
    ordererPhone: '',
    ordererEmail: '',
  });

  const { ordererName, ordererPhone, ordererEmail } = ordererInfo;

  const [receiverInfo, setReceiverInfo] = useState<receiverInfoInterface>({
    receiverName: '',
    receiverPhone: '',
    receiverPostCode: 0,
    receiverAddress: '',
    receiverDetailAddress: '',
    receiverDeliveryMemo: '',
    selfDeliveryMemoContent: '',
  });

  const {
    receiverName,
    receiverPhone,
    receiverPostCode,
    receiverAddress,
    receiverDetailAddress,
    receiverDeliveryMemo,
    selfDeliveryMemoContent,
  } = receiverInfo;

  const [errCode, setErrCode] = useState({
    ordererNameErr: '',
    ordererPhoneErr: '',
    ordererEmailErr: '',
    receiverNameErr: '',
    receiverPhoneErr: '',
    receiverDetailAddressErr: '',
    receiverDeliveryMemoErr: '',
    selfDeliveryMemoContentErr: '',
  });

  const {
    ordererNameErr,
    ordererPhoneErr,
    ordererEmailErr,
    receiverNameErr,
    receiverPhoneErr,
    receiverDetailAddressErr,
    receiverDeliveryMemoErr,
    selfDeliveryMemoContentErr,
  } = errCode;

  const [selfDeliveryMemo, setSelfDeliveryMemo] = useState(false);

  const today = new Date();

  const currentTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    today.getHours(),
    today.getMinutes(),
    today.getSeconds()
  );

  const phoneRegex = /^[0-9\b -]{13}$/;
  const emailRegex = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

  const openProductPage = (e: React.MouseEvent<HTMLElement>) => {
    window.open(`product/${e.currentTarget.dataset.id}`, '_blank');
  };

  const onOrdererInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'ordererPhone' && value.length === 11) {
      setOrdererInfo({
        ...ordererInfo,
        [name]: value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      });
    } else if (name === 'ordererPhone' && value.length === 13) {
      setOrdererInfo({
        ...ordererInfo,
        [name]: value.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      });
    } else {
      setOrdererInfo({ ...ordererInfo, [name]: value });
    }

    if (name === 'ordererName') {
      if (value) {
        setErrCode({
          ...errCode,
          ordererNameErr: '',
        });
      } else {
        setErrCode({
          ...errCode,
          ordererNameErr: '????????? ????????? ???????????????',
        });
      }
    } else if (name === 'ordererPhone') {
      if (!value) {
        setErrCode({
          ...errCode,
          ordererPhoneErr: '????????? ??????????????? ???????????????',
        });
      } else if (!phoneRegex.test(value)) {
        setErrCode({
          ...errCode,
          ordererPhoneErr: '????????? ??????????????? ???????????????',
        });
      } else {
        setErrCode({
          ...errCode,
          ordererPhoneErr: '',
        });
      }
    } else if (name === 'ordererEmail') {
      if (!value) {
        setErrCode({
          ...errCode,
          ordererEmailErr: '????????? ???????????? ???????????????',
        });
      } else if (!emailRegex.test(value)) {
        setErrCode({
          ...errCode,
          ordererEmailErr: '????????? ???????????? ???????????????',
        });
      } else {
        setErrCode({
          ...errCode,
          ordererEmailErr: '',
        });
      }
    }
  };

  const onDeliveryMemoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'receiverDeliveryMemo') {
      if (value === '????????????') {
        setSelfDeliveryMemo(true);
        setReceiverInfo({ ...receiverInfo, [name]: value });
      } else {
        setSelfDeliveryMemo(false);
        setReceiverInfo({
          ...receiverInfo,
          selfDeliveryMemoContent: '',
          [name]: value,
        });
      }
    }

    if (name === 'receiverDeliveryMemo') {
      if (value === '??????????????? ??????????????????') {
        setErrCode({
          ...errCode,
          receiverDeliveryMemoErr: '??????????????? ???????????????',
        });
      } else {
        setErrCode({
          ...errCode,
          receiverDeliveryMemoErr: '',
        });
      }
    } else if (receiverDeliveryMemo === '????????????' && name === 'selfDeliveryMemoContent') {
      if (!value) {
        setErrCode({
          ...errCode,
          selfDeliveryMemoContentErr: '??????????????? ???????????????',
        });
      } else {
        setErrCode({
          ...errCode,
          selfDeliveryMemoContentErr: '',
        });
      }
    }
  };

  const onDeliveryInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    if (name === 'checkbox') {
      checked
        ? setReceiverInfo({
            ...receiverInfo,
            receiverName: ordererName,
            receiverPhone: ordererPhone,
          })
        : setReceiverInfo({
            ...receiverInfo,
            receiverName: '',
            receiverPhone: '',
          });
    } else if (name === 'receiverPhone' && value.length === 11) {
      setReceiverInfo({
        ...receiverInfo,
        [name]: value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      });
    } else if (name === 'receiverPhone' && value.length === 13) {
      setReceiverInfo({
        ...receiverInfo,
        [name]: value.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      });
    } else {
      setReceiverInfo({ ...receiverInfo, [name]: value });
    }

    if (name === 'receiverName') {
      if (!value) {
        setErrCode({
          ...errCode,
          receiverNameErr: '????????? ????????? ???????????????',
        });
      } else {
        setErrCode({
          ...errCode,
          receiverNameErr: '',
        });
      }
    } else if (name === 'receiverPhone') {
      if (!value) {
        setErrCode({
          ...errCode,
          receiverPhoneErr: '????????? ??????????????? ???????????????',
        });
      } else if (!phoneRegex.test(value)) {
        setErrCode({
          ...errCode,
          receiverPhoneErr: '????????? ??????????????? ???????????????',
        });
      } else {
        setErrCode({
          ...errCode,
          receiverPhoneErr: '',
        });
      }
    } else if (name === 'receiverDetailAddress') {
      if (!value) {
        setErrCode({
          ...errCode,
          receiverDetailAddressErr: '??????????????? ???????????????',
        });
      } else {
        setErrCode({
          ...errCode,
          receiverDetailAddressErr: '',
        });
      }
    }
  };

  const [daumPost, setDaumPost] = useState(false);
  const toggleDaumPostcodeModal = () => {
    setDaumPost(!daumPost);
  };

  let totalPrice = 0;

  const onClickPurchaseBtn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!ordererName) {
      setErrCode({
        ...errCode,
        ordererNameErr: '????????? ????????? ???????????????',
      });
    } else if (!ordererPhone) {
      setErrCode({
        ...errCode,
        ordererPhoneErr: '????????? ??????????????? ???????????????',
      });
    } else if (!phoneRegex.test(ordererPhone)) {
      setErrCode({
        ...errCode,
        ordererPhoneErr: '????????? ??????????????? ???????????????',
      });
    } else if (!ordererEmail) {
      setErrCode({
        ...errCode,
        ordererEmailErr: '???????????? ???????????????',
      });
    } else if (!emailRegex.test(ordererEmail)) {
      setErrCode({
        ...errCode,
        ordererEmailErr: '????????? ???????????? ???????????????',
      });
    } else if (!receiverName) {
      setErrCode({
        ...errCode,
        receiverNameErr: '????????? ????????? ???????????????',
      });
    } else if (!receiverPhone) {
      setErrCode({
        ...errCode,
        receiverPhoneErr: '????????? ??????????????? ???????????????',
      });
    } else if (!phoneRegex.test(receiverPhone)) {
      setErrCode({
        ...errCode,
        receiverPhoneErr: '????????? ??????????????? ???????????????',
      });
    } else if (!receiverDetailAddress) {
      setErrCode({
        ...errCode,
        receiverDetailAddressErr: '??????????????? ???????????????',
      });
    } else if (receiverDeliveryMemo === '??????????????? ??????????????????') {
      setErrCode({
        ...errCode,
        receiverDeliveryMemoErr: '??????????????? ???????????????',
      });
    } else if (receiverDeliveryMemo === '????????????' && !selfDeliveryMemoContent) {
      setErrCode({
        ...errCode,
        selfDeliveryMemoContentErr: '??????????????? ???????????????',
      });
    } else {
      setLoading(true);
      const cartItem =
        isInCart === 'true' ? user.cart?.filter((cart) => !orderQueue?.find((a) => a.item === cart.item)) : user.cart;

      const userRef = doc(db, 'users', user.uid!);
      await updateDoc(userRef, {
        order: arrayUnion({
          time: currentTime.toString(),
          orderQueue,
          price: totalPrice,
          receiverName,
          receiverPhone,
          receiverPostCode,
          receiverAddress,
          receiverDetailAddress,
          receiverDeliveryMemo: receiverDeliveryMemo === '????????????' ? selfDeliveryMemoContent : receiverDeliveryMemo,
        }),
      });

      isInCart === 'true' &&
        orderQueue.map(
          async (a) =>
            await updateDoc(userRef, {
              cart: arrayRemove(a),
            })
        );

      dispatch(
        orderProduct({
          order: {
            time: currentTime.toString(),
            orderQueue,
            price: totalPrice,
            receiverName,
            receiverPhone,
            receiverPostCode,
            receiverAddress,
            receiverDetailAddress,
            receiverDeliveryMemo: receiverDeliveryMemo === '????????????' ? selfDeliveryMemoContent : receiverDeliveryMemo,
          },
          cart: cartItem,
        })
      );

      dispatch(
        addOrderInfo({
          order: orderQueue,
          time: currentTime.toString(),
          price: totalPrice,
          receiverName,
          receiverPhone,
          receiverPostCode,
          receiverAddress,
          receiverDetailAddress,
          receiverDeliveryMemo: receiverDeliveryMemo === '????????????' ? selfDeliveryMemoContent : receiverDeliveryMemo,
        })
      );
      setLoading(false);
      navigate('/ordersuccess');
    }
  };

  useEffect(() => {
    if (user && Object.keys(user).length) {
      setOrdererInfo({
        ordererName: user.name!,
        ordererPhone: user.phone!,
        ordererEmail: user.email!,
      });
      setReceiverInfo({
        receiverName: user.name!,
        receiverPhone: user.phone!,
        receiverPostCode: user.postcode!,
        receiverAddress: user.address!,
        receiverDetailAddress: user.detailaddress!,
        receiverDeliveryMemo: '??????????????? ??????????????????',
        selfDeliveryMemoContent: '',
      });
    }
  }, [user]);

  useEffect(() => {
    products.length && setLoadingProducts(false);
  }, [products]);

  return (
    <S.OrderWrapper>
      {loading && <Loading />}
      {daumPost && (
        <DaumPostcodeModal
          setDaumPost={setDaumPost}
          receiverInfo={receiverInfo}
          setReceiverInfo={setReceiverInfo}
          toggleDaumPostcodeModal={toggleDaumPostcodeModal}
        />
      )}
      <S.OrderLayoutDiv>
        <S.OrderDiv>
          <S.OrderTitle>?????? ?????? ??????</S.OrderTitle>
          <S.OrderProductInfoWrapper>
            {orderQueue.map((a, i) => {
              const findItem = products.find((product) => product.id === a.item);
              totalPrice += findItem?.option![0]
                ? (a.count as { item: number; count: number }[]).reduce((acc, cur) => {
                    return acc + cur.count;
                  }, 0) * findItem?.price!
                : findItem?.price! * (a.count as number);

              return (
                <S.OrderProductInfoDiv data-id={findItem?.id} onClick={openProductPage} key={i}>
                  {loadingProducts ? (
                    <S.ProductSkeletonImg />
                  ) : (
                    <S.ProductImg
                      src={findItem?.image}
                      alt="product_image"
                      data-id={findItem?.id}
                      onClick={openProductPage}
                    />
                  )}

                  <S.ProductInfoDiv data-id={findItem?.id} onClick={openProductPage}>
                    {loadingProducts ? (
                      <>
                        <S.ProductSkeletonName />
                        <S.ProductSkeletonCount />
                        <S.ProductSkeletonPrice />
                      </>
                    ) : (
                      <>
                        <S.ProductName data-id={findItem?.id} onClick={openProductPage}>
                          {findItem?.name}
                        </S.ProductName>
                        {findItem?.option![0]
                          ? (a.count as { item: number; count: number }[]).map((a, i) => (
                              <S.ProductCount data-id={findItem.id} onClick={openProductPage} key={a.item}>
                                {i + 1}. {findItem.option![a.item]} - {a.count}???
                              </S.ProductCount>
                            ))
                          : findItem !== undefined && (
                              <S.ProductCount data-id={findItem.id} onClick={openProductPage}>
                                {`${a.count}???`}
                              </S.ProductCount>
                            )}

                        <S.ProductPrice data-id={findItem?.id} onClick={openProductPage}>
                          {(findItem?.option![0]
                            ? (a.count as { item: number; count: number }[]).reduce((acc, cur) => {
                                return acc + cur.count;
                              }, 0) * findItem?.price!
                            : findItem?.price! * (a.count as number)
                          )
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          ???
                        </S.ProductPrice>
                      </>
                    )}
                  </S.ProductInfoDiv>
                </S.OrderProductInfoDiv>
              );
            })}
          </S.OrderProductInfoWrapper>

          <S.DeliveryCostDiv>
            ?????????
            <S.DeliveryCost>{loadingProducts ? '??????' : totalPrice >= 50000 ? '??????' : '3,000???'}</S.DeliveryCost>
          </S.DeliveryCostDiv>
        </S.OrderDiv>

        <S.OrderDiv>
          <S.OrderTitle>????????? ??????</S.OrderTitle>
          <S.OrdererInfoDiv>
            <S.OrdererInfoInput
              type="text"
              name="ordererName"
              value={ordererName}
              placeholder="??????"
              onChange={onOrdererInfoChange}
              errInput={ordererNameErr}
            />
            {ordererNameErr && <S.InputErrDiv>{ordererNameErr}</S.InputErrDiv>}
            <S.OrdererInfoInput
              type="text"
              name="ordererPhone"
              value={ordererPhone}
              placeholder="?????????"
              onChange={onOrdererInfoChange}
              errInput={ordererPhoneErr}
              maxLength={13}
            />
            {ordererPhoneErr && <S.InputErrDiv>{ordererPhoneErr}</S.InputErrDiv>}
            <S.OrdererInfoInput
              type="text"
              name="ordererEmail"
              value={ordererEmail}
              placeholder="?????????"
              onChange={onOrdererInfoChange}
              errInput={ordererEmailErr}
            />
            {ordererEmailErr && <S.InputErrDiv>{ordererEmailErr}</S.InputErrDiv>}
          </S.OrdererInfoDiv>
        </S.OrderDiv>
      </S.OrderLayoutDiv>

      <S.OrderLayoutDiv>
        <S.OrderDiv>
          <S.OrderTitle>?????? ??????</S.OrderTitle>
          <S.DeliveryInfoDiv>
            <S.DeliveryCheckBoxLabel htmlFor="checkbox">
              <S.DeliveryCheckBox
                type="checkbox"
                id="checkbox"
                name="checkbox"
                checked={ordererName === receiverName && ordererPhone === receiverPhone ? true : false}
                onChange={onDeliveryInfoChange}
              />
              ????????? ????????? ??????
            </S.DeliveryCheckBoxLabel>
            <S.DeliveryInfoInput
              type="text"
              name="receiverName"
              value={receiverName}
              placeholder="?????????"
              onChange={onDeliveryInfoChange}
            />
            {receiverNameErr && <S.InputErrDiv>{receiverNameErr}</S.InputErrDiv>}
            <S.DeliveryInfoInput
              type="text"
              name="receiverPhone"
              value={receiverPhone}
              placeholder="?????????"
              onChange={onDeliveryInfoChange}
              maxLength={13}
            />
            {receiverPhoneErr && <S.InputErrDiv>{receiverPhoneErr}</S.InputErrDiv>}
            <S.FlexRowDiv>
              <S.DeliveryInfoInput
                type="text"
                name="receiverPostCode"
                value={receiverPostCode}
                placeholder="????????????"
                onChange={onDeliveryInfoChange}
                onClick={toggleDaumPostcodeModal}
                halfWidth
              />
              <S.OpenPostCodeBtn onClick={toggleDaumPostcodeModal}>????????????</S.OpenPostCodeBtn>
            </S.FlexRowDiv>

            <S.DeliveryInfoInput
              type="text"
              name="receiverAddress"
              value={receiverAddress}
              placeholder="??????"
              onChange={onDeliveryInfoChange}
              onClick={toggleDaumPostcodeModal}
            />
            <S.DeliveryInfoInput
              type="text"
              name="receiverDetailAddress"
              value={receiverDetailAddress}
              placeholder="????????????"
              onChange={onDeliveryInfoChange}
            />
            {receiverDetailAddressErr && <S.InputErrDiv>{receiverDetailAddressErr}</S.InputErrDiv>}

            <S.DeliveryMemoDiv>
              <S.DeliveryMemoTitle>????????????</S.DeliveryMemoTitle>
              <S.DeliveryMemoSelect name="receiverDeliveryMemo" defaultValue="option1" onChange={onDeliveryMemoChange}>
                <S.DeliveryMemoOption value="??????????????? ??????????????????">??????????????? ??????????????????</S.DeliveryMemoOption>
                <S.DeliveryMemoOption value="?????? ?????? ?????? ?????? ????????????">
                  ?????? ?????? ?????? ?????? ????????????
                </S.DeliveryMemoOption>
                <S.DeliveryMemoOption value="????????? ???????????? ???????????????">
                  ????????? ???????????? ???????????????
                </S.DeliveryMemoOption>
                <S.DeliveryMemoOption value="????????? ????????? ????????? ???????????????">
                  ????????? ????????? ????????? ???????????????
                </S.DeliveryMemoOption>
                <S.DeliveryMemoOption value="????????????">????????????</S.DeliveryMemoOption>
              </S.DeliveryMemoSelect>
              {receiverDeliveryMemoErr && <S.InputErrDiv>{receiverDeliveryMemoErr}</S.InputErrDiv>}
              {selfDeliveryMemo && (
                <>
                  <S.DeliveryInfoInput
                    type="text"
                    name="selfDeliveryMemoContent"
                    value={selfDeliveryMemoContent}
                    placeholder="??????????????? ??????????????????"
                    onChange={onDeliveryInfoChange}
                  />
                  {selfDeliveryMemoContentErr && <S.InputErrDiv>{selfDeliveryMemoContentErr}</S.InputErrDiv>}
                </>
              )}
            </S.DeliveryMemoDiv>
          </S.DeliveryInfoDiv>
        </S.OrderDiv>

        <S.OrderDiv>
          <S.OrderTitle>?????? ??????</S.OrderTitle>
          <S.OrderSummaryDiv>
            <S.ProductPriceDiv>
              <S.DetailPriceDiv>
                <S.DetailPriceContent>????????????</S.DetailPriceContent>
                <S.DetailPriceContent>
                  {loadingProducts ? 0 : totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}???
                </S.DetailPriceContent>
              </S.DetailPriceDiv>
              <S.DetailPriceDiv>
                <S.DetailPriceContent>?????????</S.DetailPriceContent>
                <S.DetailPriceContent>
                  {loadingProducts ? '+ 0???' : totalPrice >= 50000 ? '+ ??????' : '+ 3,000???'}
                </S.DetailPriceContent>
              </S.DetailPriceDiv>
            </S.ProductPriceDiv>
            <S.DetailPriceDiv>
              <S.TotalPriceContent>??? ????????????</S.TotalPriceContent>
              <S.TotalPriceContent>
                {loadingProducts
                  ? '0???'
                  : totalPrice >= 50000
                  ? `${totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}???`
                  : (totalPrice + 3000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '???'}
              </S.TotalPriceContent>
            </S.DetailPriceDiv>
            <S.PurchaseBtn onClick={onClickPurchaseBtn}>????????????</S.PurchaseBtn>
          </S.OrderSummaryDiv>
        </S.OrderDiv>
      </S.OrderLayoutDiv>
    </S.OrderWrapper>
  );
}

export default Order;
