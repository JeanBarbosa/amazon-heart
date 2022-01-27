import axios from 'axios';

const apiIBGE = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades',
});

async function getStates() {
  const { data } = await apiIBGE.get('estados')

  return data
}

async function getCities(state: string) {
  const { data } = await apiIBGE.get(`${state}/municipios`)

  return data
}

async function getCounties(county: string) {
  const { data } = await apiIBGE.get(`municipios/${county}/distritos`)

  return data
}

export { apiIBGE, getStates, getCities, getCounties };