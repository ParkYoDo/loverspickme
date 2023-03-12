import React, { useState, useEffect, useCallback } from 'react';
import * as S from 'pages/Cart/CartStyle';
import { db } from 'service/firebase_config';
import { getDocs, collection, doc, updateDoc, arrayRemove } from 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { removeCart } from 'store/user';
import { addOrderQueue, addSelectOrderQueue } from 'store/orderQueue';
import { Link, useNavigate } from 'react-router-dom';
import { GiShoppingCart } from 'react-icons/gi';
import { TfiClose } from 'react-icons/tfi';
import OptionChangeModal from 'components/OptionChangeModal/OptionChangeModal';
import { RootState } from 'store/store';
import { productState } from 'type/interface';

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const products = useSelector((state: RootState) => state.products);

  const [loading, setLoading] = useState(true);

  const [totalProducts, setTotalProducts] = useState<productState[]>([]);

  let totalPrice: number = 0;
  let totalCount: number = 0;

  const [checkList, setCheckList] = useState<string[]>(user.cart!.map((a) => a.item));

  const onCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckList(e.currentTarget.checked ? user.cart!.map((a) => a.item) : []);
  };

  const onCheckElement = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckList(
      e.currentTarget.checked
        ? [...checkList, e.currentTarget.name]
        : checkList.filter((a) => a !== e.currentTarget.name)
    );
  };

  const [optionChangeModal, setOptionChangeModal] = useState(false);

  const [selectItem, setSelectItem] = useState('');
  const openOptionChangeModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOptionChangeModal(true);
    e.currentTarget.dataset.id && setSelectItem(e.currentTarget.dataset.id);
  };

  const moveProductPage = (e: React.MouseEvent<HTMLElement>) => {
    navigate(`/product/${e.currentTarget.dataset.id}`);
  };

  const DeleteProduct = async (e: React.MouseEvent<SVGElement>) => {
    const cartRef = doc(db, 'users', user.uid!);
    const selectItem = user.cart!.find((a) => [e.currentTarget.dataset.id].includes(a.item));

    dispatch(removeCart([e.currentTarget.dataset.id]));
    await updateDoc(cartRef, { cart: arrayRemove(selectItem) });
  };

  const DeleteSelectProduct = () => {
    if (checkList.length === 0) {
      alert('삭제할 상품을 선택하세요');
    } else {
      const cartRef = doc(db, 'users', user.uid!);
      const selectItems = user.cart!.filter((a) => checkList.includes(a.item));
      selectItems.map(async (item) => {
        await updateDoc(cartRef, { cart: arrayRemove(item) });
      });
      dispatch(removeCart(checkList));
    }
  };

  const BuyProduct = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectItem = user.cart!.find((a) => [e.currentTarget.dataset.id].includes(a.item));
    dispatch(addOrderQueue({ item: selectItem!.item, count: selectItem!.count }));
    navigate('/order?cart=true');
  };

  const BuySelectProduct = () => {
    const selectItems = user
      .cart!.filter((a) => checkList.includes(a.item))
      .map((a) => {
        return { item: a.item, count: a.count };
      });
    if (!selectItems.length) {
      alert('구매할 물품을 선택해주세요');
    } else {
      dispatch(addSelectOrderQueue(selectItems));
      navigate('/order');
      navigate('/order?cart=true');
    }
  };

  const getProduct = useCallback(async () => {
    if (products.length === 0) {
      const productRef = collection(db, 'products');
      const data = await getDocs(productRef);
      setTotalProducts(data.docs.map((doc) => ({ ...doc.data() })));
    } else {
      setTotalProducts(products);
    }
  }, [products]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  useEffect(() => {
    products.length && setLoading(false);
  }, [products]);

  return (
    <>
      {user?.cart![0] ? (
        <S.LayOutWrapper>
          <S.LayoutLeftDiv>
            <S.CheckBoxWrapper>
              <S.CheckBoxDiv>
                <S.CheckBox
                  type="checkbox"
                  id="checkbox"
                  checked={checkList.length === 0 ? false : checkList.length === user.cart.length ? true : false}
                  onChange={onCheckAll}
                />
                <S.CheckBoxLabel htmlFor="checkbox">전체선택</S.CheckBoxLabel>
              </S.CheckBoxDiv>
              <S.CheckBoxDeleteBtn onClick={DeleteSelectProduct}>선택상품 삭제</S.CheckBoxDeleteBtn>
            </S.CheckBoxWrapper>

            {user.cart.map((cart) => {
              const product = totalProducts.find((a) => a.id === cart.item);
              const itemInCheckList = checkList.includes(cart.item) ? true : 0;

              totalPrice += product?.option![0]
                ? itemInCheckList &&
                  (cart.count as { item: number; count: number }[]).reduce((acc, cur) => {
                    return acc + cur.count;
                  }, 0) * product?.price!
                : itemInCheckList && product?.price! * (cart.count as number);

              totalCount += product?.option![0]
                ? itemInCheckList &&
                  (cart.count as { item: number; count: number }[]).reduce((acc, cur) => {
                    return acc + cur.count;
                  }, 0)
                : itemInCheckList && (cart.count as number);

              return (
                <S.CartWrapper key={cart.item}>
                  {optionChangeModal && (
                    <OptionChangeModal
                      userId={user.uid!}
                      cart={user.cart!}
                      selectItem={selectItem}
                      totalProducts={totalProducts}
                      setOptionChangeModal={setOptionChangeModal}
                    />
                  )}
                  <S.CheckBox
                    type="checkbox"
                    name={cart.item}
                    checked={checkList.includes(cart.item) ? true : false}
                    onChange={onCheckElement}
                  />

                  <S.DeleteBtn>
                    <TfiClose data-id={cart.item} onClick={DeleteProduct} />
                  </S.DeleteBtn>

                  <S.CartProductWrapper>
                    <S.CartProductDiv data-id={product?.id} onClick={moveProductPage}>
                      {loading ? (
                        <>
                          <S.CartProductSkeletonImage />
                          <S.CartProductSkeletonName />
                        </>
                      ) : (
                        <>
                          <S.CartProductImage
                            src={product?.image}
                            alt="product_image"
                            data-id={product?.id}
                            onClick={moveProductPage}
                          />
                          <S.CartProductName data-id={product?.id} onClick={moveProductPage}>
                            {product?.name}
                          </S.CartProductName>
                        </>
                      )}
                    </S.CartProductDiv>

                    {product?.option![0] && (
                      <S.ProductOptionDiv>
                        {(cart.count as { item: number; count: number }[]).map((a, i) => (
                          <S.ProductOption key={a.item}>
                            {i + 1}. {product.option![a.item]} - {a.count}개
                          </S.ProductOption>
                        ))}
                      </S.ProductOptionDiv>
                    )}

                    <S.OrderPriceTitleDiv>
                      <S.OrderPriceTitle>주문금액</S.OrderPriceTitle>
                      <S.OrderPriceTitle>
                        {loading
                          ? '0원'
                          : product?.option![0]
                          ? `${(
                              (cart.count as { item: number; count: number }[]).reduce((acc, cur) => {
                                return acc + cur.count;
                              }, 0) * product.price!
                            )
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`
                          : `${(product?.price! * (cart.count as number))
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`}
                      </S.OrderPriceTitle>
                    </S.OrderPriceTitleDiv>
                    <S.OrderPriceDetailDiv>
                      <S.OrderPriceDetailLineDiv>
                        <S.OrderPriceDetailText>
                          {loading
                            ? '상품금액(총 0개)'
                            : product?.option![0]
                            ? `상품금액(총 ${(cart.count as { item: number; count: number }[]).reduce((acc, cur) => {
                                return acc + cur.count;
                              }, 0)}개)`
                            : `상품금액(총 ${cart.count}개)`}
                        </S.OrderPriceDetailText>
                        <S.OrderPriceDetailText>
                          {loading ? (
                            '0원'
                          ) : product?.option![0] ? (
                            (
                              (cart.count as { item: number; count: number }[]).reduce((acc, cur) => {
                                return acc + cur.count;
                              }, 0) * product.price!
                            )
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'
                          ) : (
                            <>
                              {(product?.price! * (cart.count as number))
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                              원
                            </>
                          )}
                        </S.OrderPriceDetailText>
                      </S.OrderPriceDetailLineDiv>
                      <S.OrderPriceDetailLineDiv>
                        <S.OrderPriceDetailText>배송비</S.OrderPriceDetailText>
                        <S.OrderPriceDetailText>
                          {product?.option![0]
                            ? (cart.count as { item: number; count: number }[]).reduce((acc, cur) => {
                                return acc + cur.count;
                              }, 0) *
                                product.price! >=
                              50000
                              ? '무료'
                              : '3,000원'
                            : product?.price! * (cart.count as number) >= 50000
                            ? '무료'
                            : '3,000원'}
                        </S.OrderPriceDetailText>
                      </S.OrderPriceDetailLineDiv>
                      <S.OrderPriceDetailLineDiv>
                        <S.OrderPriceDetailText>배송수단</S.OrderPriceDetailText>
                        <S.OrderPriceDetailText>택배</S.OrderPriceDetailText>
                      </S.OrderPriceDetailLineDiv>
                    </S.OrderPriceDetailDiv>

                    <S.CartBtnDiv>
                      <S.ChangeOptionBtn data-id={cart.item} onClick={openOptionChangeModal}>
                        옵션/수량 변경
                      </S.ChangeOptionBtn>
                      <S.PurchaseBtn data-id={cart.item} onClick={BuyProduct}>
                        구매하기
                      </S.PurchaseBtn>
                    </S.CartBtnDiv>
                  </S.CartProductWrapper>
                </S.CartWrapper>
              );
            })}
          </S.LayoutLeftDiv>
          <S.CartBottomWrapper>
            <S.DetailPriceWrapper>
              <S.DetailPriceDiv>
                <S.DetailPriceContent>상품금액(총 {loading ? 0 : totalCount}개)</S.DetailPriceContent>
                <S.DetailPriceContent>
                  {loading ? '0' : totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                </S.DetailPriceContent>
              </S.DetailPriceDiv>
              <S.DetailPriceDiv>
                <S.DetailPriceContent>배송비</S.DetailPriceContent>
                <S.DetailPriceContent>
                  {totalPrice >= 50000 ? '+ 무료' : totalPrice === 0 ? '+ 0원' : '+ 3,000원'}
                </S.DetailPriceContent>
              </S.DetailPriceDiv>
            </S.DetailPriceWrapper>
            <S.TotalPriceWrapper>
              <S.TotalPriceContent>총 주문금액</S.TotalPriceContent>
              <S.TotalPriceContent>
                {loading
                  ? '0원'
                  : totalPrice >= 50000
                  ? `${totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`
                  : totalPrice === 0
                  ? '0원'
                  : (totalPrice + 3000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'}
              </S.TotalPriceContent>
            </S.TotalPriceWrapper>
            <S.SelectPurchaseBtn onClick={BuySelectProduct}>주문하기</S.SelectPurchaseBtn>
            <S.MoveShopDiv>
              <Link to="/shop">계속 쇼핑하기</Link>
            </S.MoveShopDiv>
          </S.CartBottomWrapper>
        </S.LayOutWrapper>
      ) : (
        <>
          <S.EmptyCartWrapper>
            <S.EmptyCart>
              <S.EmptyIcon>
                <GiShoppingCart />
              </S.EmptyIcon>
              <S.EmptyText>장바구니가 비어있습니다</S.EmptyText>
            </S.EmptyCart>
          </S.EmptyCartWrapper>
          <S.MoveShopDiv>
            <Link to="/shop">계속 쇼핑하기</Link>
          </S.MoveShopDiv>
        </>
      )}
    </>
  );
}

export default Cart;
