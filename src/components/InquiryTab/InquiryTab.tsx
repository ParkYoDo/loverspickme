import React, { useState, useCallback, useEffect } from 'react';
import * as S from 'components/InquiryTab/InquiryTabStyle';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import ReactHtmlParser from 'html-react-parser';
import { HiOutlineLockOpen, HiOutlineLockClosed } from 'react-icons/hi2';
import { db } from 'service/firebase_config';
import { doc, getDoc } from 'firebase/firestore';
import { productState, inquiryInterface } from 'type/interface';
import { RootState } from 'store/store';

interface Props {
  product: productState;
}

function InquiryTab({ product }: Props) {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const [inquirys, setInquirys] = useState<inquiryInterface[]>([]);
  const [showInquiryContent, setShowInquiryContent] = useState('');

  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = inquirys?.slice(indexOfFirstItem, indexOfLastItem);

  const AlertNoRight = () => {
    alert('권한이 없습니다');
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const moveInquiryPage = () => {
    navigate(`/inquiry?product=${product.id}`);
  };

  const getInquiryContent = (e: React.MouseEvent<HTMLDivElement>) => {
    if (showInquiryContent === e.currentTarget.dataset.id) {
      setShowInquiryContent('');
    } else {
      setShowInquiryContent(e.currentTarget.dataset.id!);
    }
  };

  const getInquiry = useCallback(async () => {
    const inquiryRef = doc(db, 'inquirys', product?.id!);
    const res = await getDoc(inquiryRef);
    setInquirys(res.data()?.inquiry.reverse());
  }, [product?.id]);

  useEffect(() => {
    product !== undefined && getInquiry();
  }, [product, getInquiry]);

  return (
    <>
      {inquirys ? (
        <>
          <S.BtnDiv>
            <S.RegisterQnABtn onClick={moveInquiryPage}>상품문의</S.RegisterQnABtn>
          </S.BtnDiv>
          <S.InquiryWrapper>
            {currentItems.map((a, i) =>
              a.writerUid === user?.uid ? (
                <S.InquiryDiv key={i} data-id={a.id} onClick={getInquiryContent}>
                  <S.InquiryTopDiv data-id={a.id}>
                    <S.InquiryLeftDiv data-id={a.id}>
                      <S.LockBtnDiv data-id={a.id}>
                        <HiOutlineLockOpen data-id={a.id} />
                      </S.LockBtnDiv>
                      <S.InquiryItem data-id={a.id}>[상품] {a.title}</S.InquiryItem>
                    </S.InquiryLeftDiv>
                    <S.InquiryWriterName data-id={a.id}>{a.name.slice(0, -1) + '***'}</S.InquiryWriterName>
                  </S.InquiryTopDiv>

                  {showInquiryContent === a.id && (
                    <S.InquiryContentDiv>
                      <S.InquiryOption>- 💛{product.name}💛</S.InquiryOption>

                      <S.InquiryContent>{ReactHtmlParser(a.content)}</S.InquiryContent>
                    </S.InquiryContentDiv>
                  )}
                </S.InquiryDiv>
              ) : (
                <S.InquiryDiv key={i} onClick={AlertNoRight}>
                  <S.InquiryTopDiv>
                    <S.InquiryLeftDiv>
                      <S.LockBtnDiv>
                        <HiOutlineLockClosed />
                      </S.LockBtnDiv>
                      <S.InquiryItem>[상품] 비밀글입니다.</S.InquiryItem>
                    </S.InquiryLeftDiv>
                    <S.InquiryWriterName>{a.name.slice(0, -1) + '**'}</S.InquiryWriterName>
                  </S.InquiryTopDiv>
                </S.InquiryDiv>
              )
            )}
          </S.InquiryWrapper>
          <S.PaginationWrapper>
            <Pagination
              activePage={page}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={inquirys.length}
              pageRangeDisplayed={5}
              prevPageText={'‹'}
              nextPageText={'›'}
              onChange={handlePageChange}
            />
          </S.PaginationWrapper>
        </>
      ) : (
        <>
          <S.BtnDiv>
            <S.RegisterQnABtn onClick={moveInquiryPage}>상품문의</S.RegisterQnABtn>
          </S.BtnDiv>
          <S.EmptyInquiryDiv>
            <S.EmptyInquirText>등록된 문의가 없습니다</S.EmptyInquirText>
          </S.EmptyInquiryDiv>
        </>
      )}
    </>
  );
}

export default InquiryTab;
