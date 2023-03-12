import React, { useState, useEffect, useCallback } from 'react';
import * as S from 'pages/Board/BoardStyle';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import ReactHtmlParser from 'html-react-parser';
import { db } from 'service/firebase_config';
import { collection, getDocs } from 'firebase/firestore';
import { RootState } from 'store/store';
import { inquiryInterface } from 'type/interface';

function Board() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const products = useSelector((state: RootState) => state.products);

  const [inquirys, setInquirys] = useState<inquiryInterface[]>([]);
  const [showInquiryContent, setShowInquiryContent] = useState('');

  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = inquirys?.slice(indexOfFirstItem, indexOfLastItem);

  const AlertNoRight = () => {
    alert('권한이 없습니다');
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const moveLoginPage = () => {
    navigate('/login');
    alert('로그인이 필요합니다');
  };

  const moveInquiryPage = () => {
    Object.keys(user).length ? navigate('/inquiry') : moveLoginPage();
  };

  const getInquiryContent = (e: React.MouseEvent<HTMLDivElement>) => {
    showInquiryContent === e.currentTarget.dataset.id
      ? setShowInquiryContent('')
      : setShowInquiryContent(e.currentTarget.dataset.id!);
  };

  const getInquirys = useCallback(async () => {
    const inquiryRef = collection(db, 'inquirys');
    const res = await getDocs(inquiryRef);
    const data = res.docs.map((doc) => doc.data().inquiry);
    const fullInquirys: inquiryInterface[] = [];
    data.map((a) => fullInquirys.push(...a));
    fullInquirys.sort((a, b) => {
      if (a.time > b.time) {
        return -1;
      } else {
        return 1;
      }
    });
    setInquirys(fullInquirys);
  }, []);

  useEffect(() => {
    getInquirys();
  }, [getInquirys]);

  return (
    <>
      {inquirys.length ? (
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
                      <S.UnLockImage data-id={a.id} />
                      <S.InquiryItem data-id={a.id}>
                        {a.productId === 'etc' ? '[기타]' : '[상품]'} {a.title}
                      </S.InquiryItem>
                    </S.InquiryLeftDiv>
                    <S.InquiryWriterName data-id={a.id}>{a.name.slice(0, -1) + '***'}</S.InquiryWriterName>
                  </S.InquiryTopDiv>

                  {showInquiryContent === a.id && (
                    <S.InquiryContentDiv>
                      <S.InquiryOption>
                        {a.productId !== 'etc' && `- 💛${products.find((b) => b.id === a.productId)?.name}💛`}
                      </S.InquiryOption>

                      <S.InquiryContent>{ReactHtmlParser(a.content)}</S.InquiryContent>
                    </S.InquiryContentDiv>
                  )}
                </S.InquiryDiv>
              ) : (
                <S.InquiryDiv key={i} onClick={AlertNoRight}>
                  <S.InquiryTopDiv>
                    <S.InquiryLeftDiv>
                      <S.LockImage />
                      <S.InquiryItem>{a.productId === 'etc' ? '[기타]' : '[상품]'} 비밀글입니다.</S.InquiryItem>
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

export default Board;
