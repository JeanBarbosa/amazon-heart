import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;

  background: var(--color-tertiary);
`;

export const Header = styled.header`
  padding: 10px 0;
  background: var(--color-primary);
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
    }

    a {
      text-decoration: none;
      color: var(--color-yellow);

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Content = styled.main`
  display: flex;
  flex-direction: column;

  max-width: 1120px;
  margin: 14px auto;  

  @media(min-width: 1024px){
    flex-direction: row;
  }
`;

export const CarouselWrapper = styled.div`
  flex: 1;
  margin-right: 120px;

`;

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    color: #999591;
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid #3e3b47;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }

  > p {
    color: #999591;
  }
`;

export const Aside = styled.aside`
  width: 380px;
`;
