import React, { useState, useEffect } from 'react';
import * as S from 'components/BuyMenu/BuyMenuStyle';
import { updateDoc, arrayUnion, arrayRemove, getDoc, doc } from 'firebase/firestore';
import { db } from 'service/firebase_config';
import { BsChevronCompactDown, BsChevronDown, BsXCircle } from 'react-icons/bs';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { addCart, addWishList, removeWishList } from 'store/user';
import { addOrderQueue } from 'store/orderQueue';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'store/store';
import { selectOptionInterface } from 'type/interface';
import { productState } from 'type/interface';

interface Props {
  product: productState;
}

function BuyMenu({ product }: Props) {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const [buyModal, setBuyModal] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const [count, setCount] = useState<number>(1);
  const [selectOption, setSelectOption] = useState<selectOptionInterface[]>([]);
  const [moveModal, setMoveModal] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'count') {
      if (Number(value) <= 0 || isNaN(Number(value))) {
        setCount(1);
      } else {
        setCount(Number(value));
      }
    } else if (name === 'optionCount') {
      if (Number(value) <= 0 || isNaN(Number(value))) {
        setCount(1);
      } else {
        setSelectOption(
          selectOption.map((a) => (a.item === Number(e.target.dataset.id) ? { item: a.item, count: Number(value) } : a))
        );
      }
    }
  };

  const decreaseCount = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (count >= 2) {
      setCount(count - 1);
    }
  };

  const decreaseSelectCount = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectOption(
      selectOption.map((a) =>
        a.count >= 2 && a.item === Number(e.currentTarget.dataset.id)
          ? { item: a.item, count: (a.count as number) - 1 }
          : a
      )
    );
  };

  const increaseCount = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCount(count + 1);
  };

  const increaseSelectCount = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectOption(
      selectOption.map((a) =>
        a.item === Number(e.currentTarget.dataset.id) ? { item: a.item, count: (a.count as number) + 1 } : a
      )
    );
  };

  const onClickBtn = () => {
    setBuyModal(!buyModal);
    setShowOption(false);
  };

  const ToggleShowOption = () => {
    setShowOption(!showOption);
  };

  const selectProduct = (e: React.MouseEvent<HTMLDivElement>) => {
    const findItem = selectOption.find((a) => a.item === Number(e.currentTarget.dataset.id));
    if (findItem) {
      alert('이미 선택된 옵션입니다');
    } else {
      setSelectOption([...selectOption, { item: Number(e.currentTarget.dataset.id), count: 1 }]);
      setShowOption(false);
    }
  };

  const deleteOption = (e: React.MouseEvent<SVGElement>) => {
    setSelectOption(selectOption.filter((a) => a.item !== Number(e.currentTarget.dataset.id)));
  };

  const totalCount = selectOption.reduce((acc, cur) => {
    return acc + (cur.count as number);
  }, 0);

  const onClickCart = async () => {
    // 접속한 유저의 카트 객체 받아오기
    const userRef = doc(db, 'users', user.uid!);
    const res = await getDoc(userRef);
    const cartItem: { item: string; count: number | { item: number; count: number }[] }[] = res.data()?.cart;

    // 카트 객체 내부에 해당 프로덕트가 있는지 확인
    const findItem = cartItem?.find((a) => a.item === product.id);

    // 프로덕트에 옵션이 없으면
    if (product.option![0] === '') {
      // 카트에 있으면 수량을 증가시켜준다
      if (findItem) {
        const newUserCart = cartItem.map((a) =>
          a.item === product.id ? { ...a, count: (a.count as number) + count } : { ...a }
        );

        await updateDoc(userRef, {
          cart: newUserCart,
        });
        dispatch(addCart({ findItem, data: newUserCart }));
        setShowOption(false);
        setMoveModal(true);
      } else {
        // 카트에 없으면 수량을 담는다
        await updateDoc(userRef, {
          cart: arrayUnion({ item: product.id, count: count }),
        });
        dispatch(addCart({ findItem, data: { item: product.id, count: count } }));
        setShowOption(false);
        setMoveModal(true);
      }
    }
    // 프로덕트에 옵션이 있으면
    else {
      if (selectOption.length) {
        if (findItem) {
          const mergeArray = (findItem.count as { item: number; count: number }[]).concat(selectOption);
          const sum: { [key: string]: { item: number; count: number } } = {};

          mergeArray.forEach((a) => {
            if (sum[a.item]) {
              sum[a.item].count = sum[a.item].count + a.count;
            } else {
              sum[a.item] = a;
            }
          });

          const summary = Object.values(sum);

          const newUserCart = cartItem.map((a) => (a.item === product.id ? { ...a, count: summary } : { ...a }));
          await updateDoc(userRef, {
            cart: newUserCart,
          });
          dispatch(addCart({ findItem, data: newUserCart }));
          setShowOption(false);
          setMoveModal(true);
        } else {
          await updateDoc(userRef, {
            cart: arrayUnion({ item: product.id, count: selectOption }),
          });
          dispatch(
            addCart({
              findItem,
              data: { item: product.id, count: selectOption },
            })
          );
          setShowOption(false);
          setMoveModal(true);
        }
      } else {
        alert('옵션을 선택하세요');
      }
    }
  };

  const onClickOrderBtn = () => {
    if (product.option![0]) {
      if (selectOption.length) {
        dispatch(addOrderQueue({ item: product.id, count: selectOption }));
        navigate('/order');
      } else {
        alert('옵션을 선택하세요');
      }
    } else {
      dispatch(addOrderQueue({ item: product.id, count }));
      navigate('/order');
    }
  };

  const onClickWishBtn = async () => {
    const userRef = doc(db, 'users', user.uid!);
    const res = await getDoc(userRef);
    const wishItem: string[] = res.data()?.wish;

    const findItem = wishItem?.find((a) => a === product.id);

    if (findItem) {
      await updateDoc(userRef, {
        wish: arrayRemove(product.id),
      });
      dispatch(removeWishList(product.id));
    } else {
      await updateDoc(userRef, {
        wish: arrayUnion(product.id),
      });
      dispatch(addWishList(product.id));
    }
  };

  const moveCartPage = async () => {
    await setBuyModal(false);
    navigate('/cart');
  };

  const stayPage = () => {
    setMoveModal(false);
  };

  useEffect(() => {
    if (buyModal) {
      document.body.style.overflow = `hidden`;
    } else {
      document.body.style.overflow = `auto`;
    }
    return () => {
      document.body.style.overflow = `auto`;
    };
  }, [buyModal]);

  return (
    <>
      {moveModal && (
        <>
          <S.BackGroundWrapper moveModal={moveModal}>
            <S.MovePageModal>
              <S.MovePageTitleDiv>
                <S.MovePageTitle>선택하신 상품을 장바구니에 담았습니다</S.MovePageTitle>
              </S.MovePageTitleDiv>
              <S.MovePageBtnDiv>
                <S.MovePageBtn onClick={stayPage}>계속쇼핑</S.MovePageBtn>
                <S.MovePageBtn onClick={moveCartPage}>장바구니</S.MovePageBtn>
              </S.MovePageBtnDiv>
            </S.MovePageModal>
          </S.BackGroundWrapper>
        </>
      )}

      {buyModal ? (
        <S.BackGroundWrapper>
          <S.BuyMenuWrapper buyModal={buyModal}>
            <S.CloseBtn onClick={onClickBtn}>
              <BsChevronCompactDown />
            </S.CloseBtn>
            <S.OptionWrapper option={product.option![0] !== '' ? 'true' : 'false'}>
              {/* 물품 옵션이 있을 때 */}
              {product?.option![0] ? (
                <>
                  <S.OptionTitle>* 옵션</S.OptionTitle>
                  <S.OptionSelect showOption={showOption} onClick={ToggleShowOption}>
                    옵션(필수)
                    <S.OptionOpenBtn showOption={showOption}>
                      <BsChevronDown />
                    </S.OptionOpenBtn>
                  </S.OptionSelect>
                  {showOption && (
                    <S.OptionSelectWrapper>
                      {product.option?.map((a, i) => (
                        <S.Option data-id={i} key={i} onClick={selectProduct}>
                          <S.OptionName data-id={i}>{a}</S.OptionName>
                          <S.OptionPrice data-id={i}>
                            {product.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                          </S.OptionPrice>
                        </S.Option>
                      ))}
                    </S.OptionSelectWrapper>
                  )}
                  {/* 세부 선택 옵션이 있을 때 */}
                  {selectOption.length > 0 && (
                    <>
                      {selectOption.map((a, i) => (
                        <S.SelectProductWrapper key={i}>
                          <S.CountWord>
                            {product.option![a.item]}
                            <S.OptionDeleteBtn>
                              <BsXCircle data-id={a.item} onClick={deleteOption} />
                            </S.OptionDeleteBtn>
                          </S.CountWord>
                          <S.SelectCountWrapper>
                            <S.CountController>
                              <S.CountBtn data-id={a.item} onClick={decreaseSelectCount}>
                                -
                              </S.CountBtn>
                              <S.CountInput
                                type="text"
                                name="optionCount"
                                value={a.count}
                                data-id={a.item}
                                onChange={onChange}
                              />
                              <S.CountBtn data-id={a.item} onClick={increaseSelectCount}>
                                +
                              </S.CountBtn>
                            </S.CountController>

                            <S.CountPrice>
                              {(product.price! * a.count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
                            </S.CountPrice>
                          </S.SelectCountWrapper>
                        </S.SelectProductWrapper>
                      ))}
                      <S.ProductPriceWrapper>
                        <S.ProductCount>총 상품금액({totalCount}개)</S.ProductCount>
                        <S.ProductPrice>
                          {(product.price! * totalCount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                        </S.ProductPrice>
                      </S.ProductPriceWrapper>
                    </>
                  )}
                </>
              ) : (
                <>
                  <S.SelectProductWrapper>
                    <S.CountWord>수량</S.CountWord>
                    <S.SelectCountWrapper>
                      <S.CountController>
                        <S.CountBtn onClick={decreaseCount}>-</S.CountBtn>
                        <S.CountInput type="text" name="count" value={count} onChange={onChange} />
                        <S.CountBtn onClick={increaseCount}>+</S.CountBtn>
                      </S.CountController>

                      <S.CountPrice>
                        {(product.price! * count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                      </S.CountPrice>
                    </S.SelectCountWrapper>
                  </S.SelectProductWrapper>
                  <S.ProductPriceWrapper>
                    <S.ProductCount> 총 상품금액({count}개)</S.ProductCount>
                    <S.ProductPrice>
                      {(product.price! * count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                    </S.ProductPrice>
                  </S.ProductPriceWrapper>
                </>
              )}
            </S.OptionWrapper>

            <S.BtnWrapper>
              <S.BuyBtn onClick={onClickCart}>장바구니</S.BuyBtn>
              <S.BuyBtn onClick={onClickOrderBtn}>구매하기</S.BuyBtn>
              <S.HeartBtnDiv>
                <S.HeartBtn onClick={onClickWishBtn}>
                  {user?.wish?.find((a) => a === product.id) ? <IoHeart /> : <IoHeartOutline />}
                </S.HeartBtn>
              </S.HeartBtnDiv>
            </S.BtnWrapper>
          </S.BuyMenuWrapper>
        </S.BackGroundWrapper>
      ) : (
        //  구매버튼 누르기 전

        <S.BuyMenuWrapper onClick={onClickBtn}>
          <S.BuyBtn>장바구니</S.BuyBtn>
          <S.BuyBtn>구매하기</S.BuyBtn>
          <S.HeartBtnDiv>
            <S.HeartBtn>{user?.wish?.find((a) => a === product.id) ? <IoHeart /> : <IoHeartOutline />}</S.HeartBtn>
          </S.HeartBtnDiv>
        </S.BuyMenuWrapper>
      )}
    </>
  );
}

export default BuyMenu;
