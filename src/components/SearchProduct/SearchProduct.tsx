import React, { useState } from 'react';
import * as S from 'components/SearchProduct/SearchProductStyle';
import { TfiClose, TfiSearch } from 'react-icons/tfi';
import { useNavigate } from 'react-router-dom';
import onScrollLock from 'utils/onScrollLock';

interface Props {
  searchMenuToggle: () => void;
}

function SearchMenu({ searchMenuToggle }: Props) {
  const navigate = useNavigate();

  const [input, setInput] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const searchProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!input) {
      alert('검색어를 입력하세요');
    } else {
      searchMenuToggle();
      navigate(`/search?keyword=${input}`);
    }
  };

  onScrollLock();

  return (
    <>
      <S.SearchWrapper>
        <S.SearchForm>
          <S.SearchInput autoFocus type="text" value={input} placeholder="검색" onChange={onChange} />
          <S.SearchBtn onClick={searchProduct}>
            <TfiSearch />
          </S.SearchBtn>
        </S.SearchForm>

        <S.CloseBtn onClick={searchMenuToggle}>
          <TfiClose />
        </S.CloseBtn>
      </S.SearchWrapper>
    </>
  );
}

export default SearchMenu;
