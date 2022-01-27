import React from 'react'
import { FiHeart, FiLogIn } from 'react-icons/fi';
import logoImg from '../../assets/logo.png'
import heartImg from '../../assets/heartHome.png'
import { Link } from 'react-router-dom'
import {
  Container,
  Header,
  Content,
  Aside
} from './styles'

const Home: React.FC = () => {

  return (
    <Container>
      <Header>
        <img src={logoImg} alt="Amazon heart" width="180px" />

        <Link to="/signin">
          <FiLogIn />
          Entrar
        </Link>
      </Header>
      <Content>
        <img src={heartImg} alt="Amazon heart" width="600px" />
        <Aside>
          <h1>
            Adote um pedacinho da Amazônia
          </h1>
          <h2>É responsabilidade de todos a preservação da floresta</h2>

          <p>
            Em 2021 a Amazônia perdeu 13.235 km² de florestas, o maior nível desde 2006.
            O equivalente a 1,8 milhão de campos de futebol.
          </p>
          <p>
            A floresta, e nosso futuro, está sob ameaça para dar lugar à grilagem,
            pecuária, garimpo, extração ilegal de madeira e invasão de áreas protegidas por lei.
          </p>
          <Link to="/signup">
            <FiHeart />
            Adotar meu Pedacinho
          </Link>
        </Aside>
      </Content>
    </Container>
  )
}

export { Home }