import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div`
  height: 100vh;
  padding: 0px 20px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 120px;

 
  > a {
    display: flex;
    align-items: center;
    color: var(--color-tertiary);
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    background: var(--color-blue);
    border-radius: 10px;
    padding: 14px;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#fff')};
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 30px auto;
  width: 100%;

  >img {
    width: 300px;
  }

  @media (min-width: 1024px){
    flex-direction: row;
    justify-content: space-around;

    > img {
      width: 640px;
    }
  }
`;

export const Aside = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  p {
      margin-top: 10px;
    }

  > a {
    display: flex;
    align-items: center;

    color: var(--color-quaternary);
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
    background: var(--color-yellow);
    border-radius: 10px;
    padding: 14px;

    svg {
      margin-right: 16px;
      fill: red;
    }

    &:hover {
      color: ${shade(0.2, '#fff')};
    }
  }
`;