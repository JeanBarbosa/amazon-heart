import React from 'react';
import { Link } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import Userdefault from '../../assets/default.png';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Section,
  Calendar,
} from './styles';

import logoImg from '../../assets/logo.png';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

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

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Ultima atualizacao</h1>
          <p>
            aqui show
          </p>

          <Section>
            <strong>outra section</strong>
          </Section>

          <Section>
            <strong>mais uma section</strong>
          </Section>
        </Schedule>

        <Calendar>
          Alertas
        </Calendar>
      </Content>
    </Container>
  );
};
export { Dashboard };
