import React from 'react';
import * as S from 'components/Loading/LoadingStyle';
import Spinner from 'image/Spinner/spinner.gif';
import onScrollLock from 'utils/onScrollLock';

function Loading() {
  onScrollLock();
  return (
    <S.Background>
      <S.LoadingImage src={Spinner} alt="로딩중" />
    </S.Background>
  );
}

export default Loading;
