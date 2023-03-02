import styled from 'styled-components';

export const OptionChangeModalWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgb(255, 255, 255);
  z-index: 1;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding-bottom: 100px;
`;

export const OptionChangeModalTitle = styled.div`
  text-align: center;
  font-size: 16px;
  margin-top: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e2e2;
`;

export const TopCloseBtn = styled.button`
  position: absolute;
  right: 12px;
  top: 6px;
  font-size: 20px;
  color: #a2a2a2;
  border: none;
  background-color: transparent;
`;

export const ProductDiv = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
`;

export const ProductImage = styled.img`
  width: 70px;
  height: 70px;
`;

export const ProductContentDiv = styled.div``;

export const ProductContent = styled.div`
  font-size: 12px;
`;

export const SelectProductWrapper = styled.div`
  padding: 12px;
  padding-bottom: 0;
  background-color: #f7f6f6;
  margin: 10px 0;
`;

export const CountOptionWrapper = styled.div`
  padding: 12px;
  padding-bottom: 0;
  background-color: #f7f6f6;
  margin: 0 16px;
`;

export const CountWord = styled.div`
  position: relative;
  font-size: 14px;
  padding-bottom: 8px;
  border-bottom: 1px dashed #aaa8a8;
`;

export const CountController = styled.div`
  width: 100px;
  margin: 16px 8px;
  border: 1px solid #c8c6c6;
  font-size: 16px;
  display: flex;
  flex-direction: row;
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

export const CountBtn = styled.button`
  width: 25px;
  height: 30px;
  border: none;
  background-color: transparent;
`;

export const OptionDiv = styled.div`
  padding: 8px 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;

export const OptionCount = styled.div``;

export const OptionPrice = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

export const BottomBtnDiv = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 12px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  background-color: white;
  z-index: 1;
  box-shadow: 0px 0px 5px -4px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 0px 5px -4px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 5px -4px rgba(0, 0, 0, 0.75);
`;

export const BottomBtn = styled.button`
  width: 50%;
  height: 40px;
  font-size: 14px;
  background-color: transparent;
  border: 1px solid #c3c2c6;
  border-radius: 24px;
  color: gray;
  &:hover,
  &:active {
    border: 1px solid #ff95be;
    color: #ff95be;
  }
`;

export const OptionDivV = styled.div`
  margin: 0 16px;
`;

export const OptionTitle = styled.p`
  width: 100%;
  text-align: left;
  font-size: 15px;
  color: black;
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

export const OptionSelectWrapper = styled.div`
  width: 100%;
  max-height: 150px;
  overflow-y: scroll;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  margin-bottom: 20px;
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
  cursor: pointer;
  :nth-child(1) {
    border-top: none;
  }
`;

export const OptionName = styled.div`
  color: #676767;
  font-size: 14px;
`;

export const OptionDeleteBtn = styled.button`
  position: absolute;
  right: -4px;
  top: -8px;
  font-size: 18px;
  border: none;
  background-color: transparent;
`;

export const SelectCountWrapper = styled.div`
  height: 64%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CountPrice = styled.div`
  font-size: 14px;
`;

export const ProductPriceWrapper = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 80px;
`;

export const ProductCount = styled.div`
  font-size: 14px;
`;

export const ProductPrice = styled.div`
  color: #ff95be;
  font-size: 16px;
  font-weight: 500;
`;
