import styled from 'styled-components';

export const BackGroundWrapper = styled.div<{ moveModal?: boolean }>`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: ${(props) => (props.moveModal ? '3' : '2')};
  overflow-y: hidden;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const MovePageModal = styled.div`
  width: 300px;
  height: 150px;
  background-color: white;
  border-radius: 12px;
  z-index: 5;
  display: flex;
  flex-direction: column;
`;

export const MovePageTitleDiv = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ddd9d9;
`;

export const MovePageTitle = styled.div`
  font-size: 14px;
`;

export const MovePageBtnDiv = styled.div`
  width: 100%;
  height: 30%;
`;

export const MovePageBtn = styled.button`
  width: 50%;
  height: 100%;
  border: none;
  background-color: transparent;
  font-size: 12px;
  :nth-child(1) {
    border-right: 1px solid #ddd9d9;
  }
`;

export const BuyMenuWrapper = styled.div<{ buyModal?: boolean }>`
  position: fixed;
  right: 0;
  bottom: 0;
  height: ${(props) => !props.buyModal && '75px'};
  width: 100%;
  background-color: white;
  padding: ${(props) => (props.buyModal ? '8px' : '16px')};
  display: flex;
  flex-direction: ${(props) => (props.buyModal ? 'column' : 'row')};
  justify-content: space-between;
  align-items: center;
  text-align: center;
  border-top-left-radius: ${(props) => (props.buyModal ? '25px' : 'none')};
  border-top-right-radius: ${(props) => (props.buyModal ? '25px' : 'none')};
  overflow: hidden;
  z-index: 1;
`;

export const CartBtn = styled.button`
  border: 1px solid #c3c2c6;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  background-color: transparent;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover,
  &:active {
    border: 1px solid #ff95be;
  }
`;

export const HeartBtn = styled.button`
  border: 1px solid #c3c2c6;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  background-color: transparent;
  font-size: 24px;
  color: red;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NaverPayBtn = styled.button<{ buyModal: boolean }>`
  width: ${(props) => (props.buyModal ? '90%' : '40%')};
  height: 44px;
  background-color: #00c73a;
  border: none;
  border-radius: 25px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 15px;
  font-weight: 400;
  gap: 4px;
`;

export const NaverImg = styled.img`
  width: 50px;
  height: 20px;
`;

export const BuyBtn = styled.button<{ buyModal: boolean }>`
  width: ${(props) => (props.buyModal ? '50%' : '40%')};
  height: 44px;
  background-color: transparent;
  border: 1px solid #c3c2c6;
  border-radius: 25px;
  font-size: 16px;
  color: gray;
  &:hover,
  &:active {
    border: 1px solid #ff95be;
    color: #ff95be;
  }
`;

export const OptionWrapper = styled.div<{ option: string }>`
  border-bottom: 1px solid #c3c2c6;
  width: 100%;
  height: ${(props) => !props.option && '170px'};
  max-height: 350px;
  margin-top: 18px;
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: #5f5e5e;
  overflow-y: ${(props) => props.option && 'scroll'};
`;

export const CloseBtn = styled.button`
  width: 100%;
  height: 55px;
  position: absolute;
  top: -30px;
  left: 0;
  border: none;
  background-color: transparent;
  color: #e4e0e0;
  font-size: 48px;
`;

export const SelectProductWrapper = styled.div`
  width: 100%;
  height: 110px;
  padding: 0 12px;
  background-color: #f7f6f6;
  margin-bottom: 12px;
`;

export const CountWord = styled.div`
  height: 36%;
  text-align: left;
  font-size: 15px;
  font-weight: 400;
  border-bottom: 1px dashed black;
  padding: 8px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SelectCountWrapper = styled.div`
  height: 64%;
  padding: 8px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CountController = styled.div`
  border: 1px solid #c8c6c6;
  font-size: 16px;
`;

export const CountBtn = styled.button`
  width: 25px;
  height: 30px;
  border: none;
  background-color: transparent;
`;

export const CountInput = styled.input`
  width: 50px;
  height: 30px;
  text-align: center;
  border: none;
  border-left: 1px solid #c8c6c6;
  border-right: 1px solid #c8c6c6;
  outline: none;
`;

export const CountPrice = styled.div`
  font-size: 14px;
`;

export const ProductPriceWrapper = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  font-size: 14px;
  gap: 80px;
`;

export const ProductCount = styled.div``;

export const ProductPrice = styled.div`
  color: #ff95be;
`;

export const OptionTitle = styled.p`
  width: 100%;
  text-align: left;
  font-size: 15px;
  color: black;
`;

export const OptionSelectWrapper = styled.div`
  width: 100%;
  min-height: 195px;
  overflow-y: scroll;
  margin-bottom: 16px;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
`;

export const OptionSelect = styled.div<{ showOption: boolean }>`
  width: 100%;
  text-align: left;
  border: ${(props) => (props.showOption ? '1px solid black' : '1px solid #c3c2c6')};
  padding: 8px;
  font-size: 16px;
  margin-bottom: ${(props) => !props.showOption && '20px'};
  color: #706f72;
  cursor: pointer;
`;

export const OptionOpenBtn = styled.button<{ showOption: boolean }>`
  position: absolute;
  right: 20px;
  border: none;
  background-color: transparent;
  transform: ${(props) => props.showOption && 'rotateZ(180deg)'};
`;

export const OptionDeleteBtn = styled.div`
  font-size: 18px;
`;

export const Option = styled.div`
  display: none;
  width: 100%;
  border-top: 1px solid #c3c2c6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 8px 12px;
  font-size: 16px;
  cursor: pointer;
  :nth-child(1) {
    border-top: none;
  }
  p {
    margin: 0;
  }
`;

export const OptionName = styled.p``;

export const OptionPrice = styled.p`
  color: black;
  font-weight: 500;
`;

export const BtnWrapper = styled.div`
  width: 100%;
  height: 120px;
  margin-top: 8px;
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const WidthDivider = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 12px;
`;
