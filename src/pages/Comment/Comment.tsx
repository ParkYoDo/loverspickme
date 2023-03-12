import React, { useEffect, useState } from 'react';
import * as S from 'pages/Comment/CommentStyle';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Ckeditor from 'components/Ckeditor/Ckeditor';
import { useSelector } from 'react-redux';
import { db, storage } from 'service/firebase_config';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, collection } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { RootState } from 'store/store';
import onScrollLock from 'utils/onScrollLock';
import Loading from 'components/Loading/Loading';

function Comment() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const productId = searchParams.get('product');

  const user = useSelector((state: RootState) => state.user);
  const products = useSelector((state: RootState) => state.products);
  const product = products.find((a) => a.id === productId);

  const [loading, setLoading] = useState(false);
  const [skeletonLoading, setSkeletonLoading] = useState(true);

  const [comment, setComment] = useState({
    title: '',
    content: '',
  });
  const { title, content } = comment;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setComment({ ...comment, [name]: value });
  };

  const movePrevPage = () => {
    navigate(-1);
  };

  const today = new Date();

  const currentTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    today.getHours(),
    today.getMinutes(),
    today.getSeconds()
  );

  const uploadImage = async () => {
    // const imageRegex = /<img[^>]+src=[\"']?([^>\"']+)[\"']?[^>]*>/g;
    const imageRegex = /<img[^>]+src=["']?([^>"']+)["']?[^>]*>/g;
    const imageSrc = imageRegex.exec(content);
    if (imageSrc) {
      const imageRef = doc(collection(db, 'comments'));
      const storageRef = ref(storage, `/comments/${productId}/${imageRef.id}`);
      await uploadString(storageRef, imageSrc[1], 'data_url');
      const url = await getDownloadURL(storageRef);

      const newContent = content.replace(imageSrc[1], url);
      return newContent;
    } else {
      return content;
    }
  };

  const uploadComment = async (newContent: string) => {
    const commentRef = doc(db, 'comments', productId!);
    const CommentIdRef = doc(collection(db, 'comments'));
    const res = await getDoc(commentRef);
    const isFillObject = res.data() && Object.keys(res.data()!).length;

    if (isFillObject) {
      await updateDoc(commentRef, {
        comment: arrayUnion({
          time: currentTime,
          writerUid: user.uid,
          name: user.name,
          title,
          content: newContent,
          id: CommentIdRef.id,
          productId,
        }),
      });
    } else {
      await setDoc(doc(db, 'comments', productId!), {
        comment: [
          {
            time: currentTime,
            writerUid: user.uid,
            name: user.name,
            title,
            content: newContent,
            id: CommentIdRef.id,
            productId,
          },
        ],
      });
    }
  };

  const onSubmit = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!title) {
      alert('제목을 입력하세요');
    } else if (!content) {
      alert('내용을 입력하세요');
    } else {
      setLoading(true);
      const newContent = await uploadImage();
      await uploadComment(newContent);
      setLoading(false);
      alert('작성되었습니다');
      navigate(-1);
    }
  };

  onScrollLock();

  useEffect(() => {
    products.length && setSkeletonLoading(false);
  }, [products]);

  return (
    <>
      {loading && <Loading />}
      <S.CommentWrapper>
        <S.ModalTitleDiv>
          <S.CancelBtn onClick={movePrevPage} />
          <S.CommentTitle>상품평</S.CommentTitle>
          <S.SubmitBtn onClick={onSubmit}>작성</S.SubmitBtn>
        </S.ModalTitleDiv>
        <S.ProductDiv>
          <S.ProductName>{skeletonLoading ? 'PRODUCT' : product?.name}</S.ProductName>
        </S.ProductDiv>

        <S.CommentTitleDiv>
          <S.CommentTitleInput
            autoFocus
            type="text"
            name="title"
            value={title}
            placeholder="제목"
            onChange={onChange}
          />
          <S.LockImage />
        </S.CommentTitleDiv>

        <Ckeditor state={comment} setState={setComment} />
      </S.CommentWrapper>
    </>
  );
}

export default Comment;
