import React, { useEffect } from 'react';
import * as S from 'components/DaumPostcodeModal/DaumPostcodeModalStyle';
import { TfiClose } from 'react-icons/tfi';
import { receiverInfoInterface } from 'type/interface';

interface Props {
  setDaumPost: React.Dispatch<React.SetStateAction<boolean>>;
  receiverInfo: receiverInfoInterface;
  setReceiverInfo: React.Dispatch<React.SetStateAction<receiverInfoInterface>>;
  toggleDaumPostcodeModal: () => void;
}

function DaumPostcodeModal({ setDaumPost, receiverInfo, setReceiverInfo, toggleDaumPostcodeModal }: Props) {
  const onCompletePost = (data: any) => {
    let postcode = Number(data.zonecode);
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? `(${extraAddress})` : '';
    }

    setReceiverInfo({
      ...receiverInfo,
      receiverPostCode: postcode,
      receiverAddress: fullAddress,
    });
    setDaumPost(false);
  };

  useEffect(() => {
    document.body.style.overflow = `hidden`;
    return () => {
      document.body.style.overflow = `auto`;
    };
  }, []);

  return (
    <S.ModalWrapper>
      <S.ModalTitleDiv>
        <S.ModalTitle>주소찾기</S.ModalTitle>
        <S.CloseModalBtn onClick={toggleDaumPostcodeModal}>
          <TfiClose />
        </S.CloseModalBtn>
      </S.ModalTitleDiv>
      <S.DaumPostDiv autoClose onComplete={onCompletePost} />
    </S.ModalWrapper>
  );
}

export default DaumPostcodeModal;
