import styled from 'styled-components';

export const SearchWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3;
`;

export const SearchForm = styled.form`
  margin-top: 150px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const SearchInput = styled.input`
  width: 70%;
  height: 50px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid white;
  color: white;
  outline: none;
  font-size: 20px;
  font-weight: 300;
  &::placeholder {
    color: white;
    font-weight: 300;
  }
`;

export const SearchBtn = styled.button`
  width: 50px;
  height: 50px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid white;
  color: white;
  font-size: 25px;
`;

export const CloseBtn = styled.button`
  width: 50px;
  height: 50px;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 25px;
  position: absolute;
  top: 0;
  right: 0;
`;
