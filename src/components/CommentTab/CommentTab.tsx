import React, { useState, useCallback, useEffect } from 'react';
import * as S from 'components/CommentTab/CommentTabStyle';
import { useNavigate } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import ReactHtmlParser from 'html-react-parser';
import { db } from 'service/firebase_config';
import { doc, getDoc } from 'firebase/firestore';
import { SlBubble } from 'react-icons/sl';
import { productState, commentInterface } from 'type/interface';

interface Props {
  product: productState;
}

function CommentTab({ product }: Props) {
  const navigate = useNavigate();

  const [comments, setComments] = useState<commentInterface[]>([]);
  const [showCommentContent, setShowCommentContent] = useState('');

  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = comments?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const moveCommentPage = () => {
    navigate(`/comment?product=${product.id}`);
  };

  const getCommentContent = (e: React.MouseEvent<HTMLDivElement>) => {
    if (showCommentContent === e.currentTarget.dataset.id) {
      setShowCommentContent('');
    } else {
      setShowCommentContent(e.currentTarget.dataset.id!);
    }
  };

  const getComment = useCallback(async () => {
    const commentRef = doc(db, 'comments', product?.id!);
    const res = await getDoc(commentRef);
    setComments(res.data()?.comment.reverse());
  }, [product?.id]);

  useEffect(() => {
    product !== undefined && getComment();
  }, [product, getComment]);
  return (
    <>
      {comments ? (
        <>
          <S.BtnDiv>
            <S.RegisterCommentBtn onClick={moveCommentPage}>상품평 작성</S.RegisterCommentBtn>
          </S.BtnDiv>
          <S.CommentWrapper>
            {currentItems.map((a, i) => (
              <S.CommentDiv key={i} data-id={a.id} onClick={getCommentContent}>
                <S.CommentTopDiv data-id={a.id}>
                  <S.CommentLeftDiv data-id={a.id}>
                    <S.CommentBtnDiv data-id={a.id}>
                      <SlBubble />
                    </S.CommentBtnDiv>
                    <S.CommentItem data-id={a.id}>{a.title}</S.CommentItem>
                  </S.CommentLeftDiv>
                  <S.CommentWriterName data-id={a.id}>{a.name.slice(0, -1) + '***'}</S.CommentWriterName>
                </S.CommentTopDiv>

                {showCommentContent === a.id && (
                  <S.CommentContentDiv>
                    <S.CommentOption>- 💛{product.name}💛</S.CommentOption>

                    <S.CommentContent>{ReactHtmlParser(a.content)}</S.CommentContent>
                  </S.CommentContentDiv>
                )}
              </S.CommentDiv>
            ))}
          </S.CommentWrapper>
          <S.PaginationWrapper>
            <Pagination
              activePage={page}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={comments.length}
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
            <S.RegisterCommentBtn onClick={moveCommentPage}>상품평 작성</S.RegisterCommentBtn>
          </S.BtnDiv>
          <S.EmptyCommentDiv>
            <S.EmptyCommentText>등록된 상품평이 없습니다</S.EmptyCommentText>
          </S.EmptyCommentDiv>
        </>
      )}
    </>
  );
}

export default CommentTab;
