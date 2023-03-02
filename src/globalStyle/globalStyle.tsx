import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 10px;
  }

  body {
    min-height: 100vh;
    background-color: #e4e3e8;
    padding: 80px 20px 30px 20px;
  }
`;
