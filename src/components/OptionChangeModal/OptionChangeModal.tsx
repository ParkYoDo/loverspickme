import React, { useState, useEffect, SetStateAction } from 'react';
import * as S from 'components/OptionChangeModal/OptionChangeModalStyle';
import { db } from 'service/firebase_config';
import { updateDoc, doc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { updateCart } from 'store/user';
import { TfiClose } from 'react-icons/tfi';
import { BsChevronDown, BsXCircle } from 'react-icons/bs';
import { productState } from 'type/interface';

interface Props {
  userId: string;
  cart: { item: string; count: number | { item: number; count: number }[] }[];
  selectItem: string;
  totalProducts: productState[];
  setOptionChangeModal: React.Dispatch<SetStateAction<boolean>>;
}

interface selectOptionInterface {
  item: number;
  count: number;
}

function OptionChangeModal({ userId, cart, selectItem, totalProducts, setOptionChangeModal }: Props) {
  const dispatch = useDispatch();

  const findProduct = totalProducts.find((a) => a.id === selectItem);
  const productOption = cart.find((a) => a.item === selectItem);

  const [showOption, setShowOption] = useState(false);

  const ToggleShowOption = () => {
    setShowOption(!showOption);
  };

  const [selectOption, setSelectOption] = useState(productOption?.count);

  const selectProduct = (e: React.MouseEvent<HTMLDivElement>) => {
    const findItem = (selectOption as selectOptionInterface[]).find(
      (a) => a.item === Number(e.currentTarget.dataset.id)
    );
    if (findItem) {
      alert('이미 선택된 옵션입니다');
    } else {
      setSelectOption([
        ...(selectOption as selectOptionInterface[]),
        { item: Number(e.currentTarget.dataset.id), count: 1 },
      ]);
      setShowOption(false);
    }
  };

  const [count, setCount] = useState(productOption!.count);

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
          (selectOption as selectOptionInterface[]).map((a) =>
            a.item === Number(e.target.dataset.id) ? { item: a.item, count: Number(value) } : a
          )
        );
      }
    }
  };

  const decreaseCount = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (count >= 2) {
      setCount((count as number) - 1);
    }
  };

  const decreaseSelectCount = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectOption(
      (selectOption as selectOptionInterface[]).map((a) =>
        a.count >= 2 && a.item === Number(e.currentTarget.dataset.id) ? { item: a.item, count: a.count - 1 } : a
      )
    );
    // }
  };

  const increaseCount = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCount((count as number) + 1);
  };

  const increaseSelectCount = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectOption(
      (selectOption as selectOptionInterface[]).map((a) =>
        a.item === Number(e.currentTarget.dataset.id) ? { item: a.item, count: a.count + 1 } : a
      )
    );
  };

  const deleteOption = (e: React.MouseEvent<SVGElement>) => {
    setSelectOption(
      (selectOption as selectOptionInterface[]).filter((a) => a.item !== Number(e.currentTarget.dataset.id))
    );
  };

  const closeOptionChangeModal = () => {
    setOptionChangeModal(false);
  };

  const totalCount =
    findProduct?.option![0] &&
    (selectOption as selectOptionInterface[]).reduce((acc, cur) => {
      return acc + cur.count;
    }, 0);

  const ChangeProductOption = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const cartRef = doc(db, 'users', userId);
    if (findProduct?.option![0]) {
      if (!(selectOption as selectOptionInterface[]).length) {
        alert('필수옵션이 1개 이상 선택되어야합니다');
        e.preventDefault();
      } else {
        const NewCart = cart.map((a) => (a.item === productOption!.item ? { ...a, count: selectOption } : a));
        await updateDoc(cartRef, { cart: NewCart });
        dispatch(updateCart(NewCart));
        setOptionChangeModal(false);
      }
    } else {
      const NewCart = cart.map((a) => (a.item === productOption!.item ? { ...a, count } : a));
      await updateDoc(cartRef, { cart: NewCart });
      dispatch(updateCart(NewCart));
      setOptionChangeModal(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = `hidden`;
    return () => {
      document.body.style.overflow = `auto`;
    };
  }, []);

  return (
    <>
      <S.OptionChangeModalWrapper>
        <S.TopCloseBtn onClick={closeOptionChangeModal}>
          <TfiClose />
        </S.TopCloseBtn>
        <S.OptionChangeModalTitle>옵션 변경</S.OptionChangeModalTitle>
        <S.ProductDiv>
          <S.ProductImage src={findProduct?.image} alt="product_image" />
          <S.ProductContentDiv>
            <S.ProductContent>{findProduct?.name}</S.ProductContent>
            <S.ProductContent>
              {findProduct?.price!.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
            </S.ProductContent>
          </S.ProductContentDiv>
        </S.ProductDiv>

        {findProduct?.option![0] ? (
          <S.OptionDivV>
            <S.OptionTitle>* 옵션</S.OptionTitle>

            <S.OptionSelect showOption={showOption} onClick={ToggleShowOption}>
              옵션(필수)
              <S.OptionOpenBtn showOption={showOption}>
                <BsChevronDown />
              </S.OptionOpenBtn>
            </S.OptionSelect>

            {showOption && (
              <S.OptionSelectWrapper>
                {findProduct.option.map((a, i) => (
                  <S.Option data-id={i} key={i} onClick={selectProduct}>
                    <S.OptionName data-id={i}>{a}</S.OptionName>
                    <S.OptionPrice data-id={i}>
                      {findProduct.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                    </S.OptionPrice>
                  </S.Option>
                ))}
              </S.OptionSelectWrapper>
            )}
            {/* 세부 선택 옵션이 있을 때 */}
            {(selectOption as selectOptionInterface[]).length > 0 && (
              <>
                {(selectOption as selectOptionInterface[]).map((a, i) => (
                  <S.SelectProductWrapper key={i}>
                    <S.CountWord>
                      {findProduct.option![a.item]}
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
                        {(findProduct.price! * a.count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
                      </S.CountPrice>
                    </S.SelectCountWrapper>
                  </S.SelectProductWrapper>
                ))}
                <S.ProductPriceWrapper>
                  {/* 여기 */}
                  <S.ProductCount>총 상품금액({totalCount}개)</S.ProductCount>
                  <S.ProductPrice>
                    {(findProduct.price! * (totalCount as number)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                  </S.ProductPrice>
                </S.ProductPriceWrapper>
              </>
            )}
          </S.OptionDivV>
        ) : (
          <>
            <S.CountOptionWrapper>
              <S.CountWord>수량</S.CountWord>
              <S.CountController>
                <S.CountBtn onClick={decreaseCount}>-</S.CountBtn>
                <S.CountInput type="text" name="count" value={count as number} onChange={onChange} />
                <S.CountBtn onClick={increaseCount}>+</S.CountBtn>
              </S.CountController>
            </S.CountOptionWrapper>
            <S.OptionDiv>
              <S.ProductCount>{`총 상품금액(${count}개)`}</S.ProductCount>
              <S.ProductPrice>
                {(findProduct?.price! * (count as number)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
              </S.ProductPrice>
            </S.OptionDiv>
          </>
        )}
      </S.OptionChangeModalWrapper>
      <S.BottomBtnDiv>
        <S.BottomBtn onClick={closeOptionChangeModal}>취소</S.BottomBtn>
        <S.BottomBtn onClick={ChangeProductOption}>변경</S.BottomBtn>
      </S.BottomBtnDiv>
    </>
  );
}

export default OptionChangeModal;
