import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: #3EB489;
    color: #fff;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Poppins', serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-family: 'Poppins', serif;
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

  /* Chrome, Safari */
  ::-webkit-scrollbar {
    width: 15px;
    height: 15px;
  }

  ::-webkit-scrollbar-track-piece  {
    background-color: #C2D2E4;
  }

  ::-webkit-scrollbar-thumb:vertical {
    height: 30px;
    background-color: #071860;
  }

  :root {
    --color-primary: #3EB489;
    --color-secondary: #FB6D3A;
    --color-tertiary: #ffffff;
    --color-quaternary: #000000;
    --color-quinary: #eeeeee;
    --color-sextinary: #7a8099;

    --color-green: #126e51;
    --color-blue: #071860;
    --color-yellow: #FAFF00;
    --color-border: #bdc4c9;
    --color-text-gray: #666666;
  }
`;
