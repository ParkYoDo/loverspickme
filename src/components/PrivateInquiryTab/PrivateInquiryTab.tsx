import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import * as S from 'components/PrivateInquiryTab/PrivateInquiryTabStyle';
import { db } from 'service/firebase_config';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import ReactHtmlParser from 'html-react-parser';
import { RootState } from 'store/store';
import { inquiryInterface } from 'type/interface';

function PrivateInquiryTab() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const products = useSelector((state: RootState) => state.products);

  const [privateInquiry, setPrivateInquiry] = useState<inquiryInterface[]>([]);
  const [showInquiryContent, setShowInquiryContent] = useState('');

  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = privateInquiry.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const moveInquiryPage = () => {
    navigate('/inquiry');
  };

  const getInquiryContent = (e: React.MouseEvent<HTMLDivElement>) => {
    if (showInquiryContent === e.currentTarget.dataset.id) {
      setShowInquiryContent('');
    } else {
      setShowInquiryContent(e.currentTarget.dataset.id!);
    }
  };

  const getInquiry = useCallback(async () => {
    const res = await getDocs(collection(db, 'inquirys'));
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
    setPrivateInquiry(fullInquirys.filter((a) => a.writerUid === user.uid));
  }, [user.uid]);

  useEffect(() => {
    getInquiry();
  }, [getInquiry]);

  return (
    <>
      {privateInquiry?.length ? (
        <S.InquiryWrapper>
          <S.BtnDiv>
            <S.RegisterQnABtn onClick={moveInquiryPage}>상품문의</S.RegisterQnABtn>
          </S.BtnDiv>

          {currentItems.map((a, i) => (
            <S.InquiryDiv key={i} data-id={a.id} onClick={getInquiryContent}>
              <S.InquiryTopDiv data-id={a.id}>
                <S.InquiryLeftDiv data-id={a.id}>
                  <S.LockImage data-id={a.id} />
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
          ))}

          <S.PaginationWrapper>
            <Pagination
              activePage={page}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={privateInquiry.length}
              pageRangeDisplayed={5}
              prevPageText={'‹'}
              nextPageText={'›'}
              onChange={handlePageChange}
            />
          </S.PaginationWrapper>
        </S.InquiryWrapper>
      ) : (
        <S.EmptyOrderListDiv>
          <S.EmptyOrderListText>주문 내역이 없습니다</S.EmptyOrderListText>
        </S.EmptyOrderListDiv>
      )}
    </>
  );
}

export default PrivateInquiryTab;
