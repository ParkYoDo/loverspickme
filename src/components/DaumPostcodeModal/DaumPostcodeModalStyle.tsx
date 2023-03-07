import styled from 'styled-components';
import DaumPostcode from 'react-daum-postcode';

export const ModalWrapper = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
`;

export const ModalTitleDiv = styled.div`
  position: relative;
`;

export const ModalTitle = styled.div`
  width: 100%;
  text-align: center;
  font-size: 18px;
  padding: 12px 0;
`;

export const CloseModalBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background-color: transparent;
  font-size: 18px;
  color: #898686;
`;

export const DaumPostDiv = styled(DaumPostcode)`
  border: 1px solid black;
  margin-bottom: 5px;
  height: 340px !important;
`;
