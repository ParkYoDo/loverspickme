import React, { useState, ChangeEvent, useEffect } from 'react';
import * as S from 'pages/Inquiry/InquiryStyle';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { db, storage } from 'service/firebase_config';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, collection } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { RootState } from 'store/store';
import Ckeditor from 'components/Ckeditor/Ckeditor';
import onScrollLock from 'utils/onScrollLock';
import Loading from 'components/Loading/Loading';

function Inquiry() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const productId = searchParams.get('product') || 'etc';

  const user = useSelector((state: RootState) => state.user);
  const products = useSelector((state: RootState) => state.products);
  const product = products.find((a) => a.id === productId);

  const [loading, setLoading] = useState(false);
  const [skeletonLoading, setSkeletonLoading] = useState(true);

  const [inquiry, setInquiry] = useState({
    title: '',
    content: '',
  });
  const { title, content } = inquiry;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInquiry({ ...inquiry, [name]: value });
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
      const imageRef = doc(collection(db, 'inquirys'));
      const storageRef = ref(storage, `/inquirys/${productId}/${imageRef.id}`);

      await uploadString(storageRef, imageSrc[1], 'data_url');
      const url = await getDownloadURL(storageRef);

      const newContent = content.replace(imageSrc[1], url);
      return newContent;
    } else {
      return content;
    }
  };

  const uploadInquiry = async (newContent: string) => {
    const inquiryRef = doc(db, 'inquirys', productId);
    const inquiryIdRef = doc(collection(db, 'inquirys'));
    const res = await getDoc(inquiryRef);
    const isFillObject = res.data() && Object.keys(res.data()!).length;

    if (isFillObject) {
      await updateDoc(inquiryRef, {
        inquiry: arrayUnion({
          time: currentTime,
          writerUid: user.uid,
          name: user.name,
          title,
          content: newContent,
          id: inquiryIdRef.id,
          productId,
        }),
      });
    } else {
      await setDoc(doc(db, 'inquirys', productId), {
        inquiry: [
          {
            time: currentTime,
            writerUid: user.uid,
            name: user.name,
            title,
            content: newContent,
            id: inquiryIdRef.id,
            productId: productId,
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
      await uploadInquiry(newContent);
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
      <S.InquiryWrapper>
        <S.ModalTitleDiv>
          <S.CancelBtn onClick={movePrevPage} />
          <S.InquiryTitle>Q&A</S.InquiryTitle>
          <S.SubmitBtn onClick={onSubmit}>작성</S.SubmitBtn>
        </S.ModalTitleDiv>
        <S.ProductDiv>
          <S.ProductName>{skeletonLoading ? 'PRODUCT' : product?.name || '[기타]'}</S.ProductName>
        </S.ProductDiv>

        <S.InquiryTitleDiv>
          <S.InquiryTitleInput
            autoFocus
            type="text"
            name="title"
            value={title}
            placeholder="제목"
            onChange={onChange}
          />
          <S.LockImage />
        </S.InquiryTitleDiv>

        <Ckeditor state={inquiry} setState={setInquiry} />
      </S.InquiryWrapper>
    </>
  );
}

export default Inquiry;
