import React, { useState, useEffect } from 'react';
import * as S from 'components/DetailProductTab/DetailProductTabStyle';
import { db } from 'service/firebase_config';
import { getDocs, collection } from 'firebase/firestore';
import { productState, noticeInterface } from 'type/interface';

interface Props {
  product: productState;
}

function DetailProductTab({ product }: Props) {
  const [notice, setNotice] = useState<noticeInterface>();

  const [loading, setLoading] = useState(true);

  const getNotice = async () => {
    const noticeRef = collection(db, 'notice');
    const res = await getDocs(noticeRef);
    res.forEach((doc) => {
      setNotice(doc.data() as noticeInterface);
    });
  };

  useEffect(() => {
    getNotice();
  }, []);

  useEffect(() => {
    notice && Object.keys(notice).length && setLoading(false);
  }, [notice]);

  return (
    <S.FullWidthImageDiv>
      {loading ? (
        <S.SkeletonImage />
      ) : (
        <>
          {notice && notice.firstNotice.map((a, i) => <S.FullWidthImage src={a} alt="asd" key={i} />)}
          {product && product.detailImage!.map((a, i) => <S.FullWidthImage src={a} alt="asd" key={i} />)}
          {notice && notice.lastNotice.map((a, i) => <S.FullWidthImage src={a} alt="asd" key={i} />)}
        </>
      )}
    </S.FullWidthImageDiv>
  );
}

export default DetailProductTab;
