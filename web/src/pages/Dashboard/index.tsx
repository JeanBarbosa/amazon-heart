import React from 'react';
import { Link } from 'react-router-dom';
import Userdefault from '../../assets/default.png';
import { useAuth } from '../../hooks/auth';
import CarouselImg from '../../components/CarouselImg';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  CarouselWrapper,
  Section,
  Aside,
} from './styles';

import logoImg from '../../assets/logo.png';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="amazon heart" width="110px" />

          <Profile>
            {user.avatar ? <img
              src={user.avatar}
              alt={user.username}
            /> : <img
              src={Userdefault}
              alt={user.username}
            />}

            <div>
              <span>Bem vindo,</span>
              <Link to="/profile">
                <strong>{user.username}</strong>
              </Link>
            </div>
          </Profile>
        </HeaderContent>
      </Header>

      <Content>
        <CarouselWrapper>
          <CarouselImg latitude={-15.780000} longitude={-47.930000} />
        </CarouselWrapper>

        <Aside>
          <Section>
            <Link to="/maps">
              Mapa
            </Link>
          </Section>
          <Section>
            <h2>Ultima pesquisa</h2>
          </Section>
        </Aside>
      </Content>
    </Container>
  );
};
export { Dashboard };
