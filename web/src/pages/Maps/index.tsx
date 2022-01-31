import "leaflet/dist/leaflet.css";

import React, { FormEvent, useState, useEffect, useCallback, useRef } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import Leaflet from "leaflet";
import { v4 as uuidv4 } from "uuid";
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import { fetchLocalMapBox, token } from "../../services/mapbox";
//import AsyncSelect from "react-select/async";

import mapPin from "../../assets/map/pin.svg";
import { Container, Content } from './styles'
import { getStates, getCities, getCounties } from '../../services/ibge'
import CarouselImg from '../../components/CarouselImg'
import Button from "../../components/Button";
import Select from '../../components/Select';

const initialPosition = { lat: -3.044653, lng: -60.1071926 };

const mapHeartIcon = Leaflet.icon({
  iconUrl: mapPin,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

interface Heart {
  id: string;
  latitude: number;
  longitude: number;
}

type Position = {
  longitude: number;
  latitude: number;
};

interface IBGEFormData {
  state: string;
  city: string;
  county: string;
}

const Maps: React.FC = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [position, setPosition] = useState<Position | null>(null);
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [counties, setCounties] = useState([]);

  const [state, setState] = useState("")
  const [city, setCity] = useState("")
  const [county, setCounty] = useState("")

  const [location, setLocation] = useState(initialPosition);

  const loadStates = async () => {
    const response = await getStates();

    let states: any = [];

    response.map((item: any) => {
      states.push({
        label: item.nome,
        value: item.sigla,
      });
    });

    setStates(states)
  };

  const loadCities = async (uf: string, name?: string) => {
    setCities([])

    const response = await getCities(uf);

    let cities: any = [];

    response.map((item: any) => {
      cities.push({
        label: item.nome,
        value: item.id,
      });
    });

    setCities(cities)
  };

  const loadCounties = async (city: string, name?: string) => {
    setCounties([])
    const response = await getCounties(city);

    let counties: any = [];

    response.map((item: any) => {
      counties.push({
        label: item.nome,
        value: item.id,
      });
    });

    setCounties(counties)
  }

  const loadOptions = async () => {

    const local = `Brazil, ${state} ${city} ${county}`
    const response = await fetchLocalMapBox(local)
    const { center } = response.features[0]

    setPosition({
      longitude: center[0],
      latitude: center[1],
    });

    setLocation({
      lng: center[0],
      lat: center[1],
    });

    setHearts([
      ...hearts,
      {
        id: uuidv4(),
        latitude: center[1],
        longitude: center[0],
      },
    ]);
  };

  const handleSubmit = useCallback(
    async (data: IBGEFormData, { reset }) => {

      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          state: Yup.string().required('Estado obrigatório'),
          city: Yup.string().required('Cidade obrigatório'),
          county: Yup.string().required('Município obrigatório'),
        });

        await schema.validate({
          state,
          city,
          county
        }, {
          abortEarly: false,
        });

        // await api.post('/hearts', data);
        await loadOptions()

        reset()

      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
      }
    },
    [addToast, state, city, county],
  );

  useEffect(() => {
    loadStates()
  }, [])

  return (
    <Container>
      <Content>
        <main>
          <Form
            ref={formRef}
            initialData={{
              state: "",
              city: "",
              county: ""
            }}
            className="landing-page-form"
            onSubmit={handleSubmit}
          >
            <fieldset>
              <legend>Procurar</legend>

              <div className="input-block">
                <label htmlFor="state">Estado</label>
                <Select
                  name="state"
                  // classNamePrefix="filter"
                  options={states}
                  placeholder="Selecionar estado..."
                  onChange={(ev: any) => {
                    setState(ev.label)
                    loadCities(ev.value, ev.label)
                  }}
                />
              </div>
              <div className="input-block">
                <label htmlFor="city">Cidade</label>
                <Select
                  name="city"
                  options={cities}
                  placeholder="Selecionar cidade..."
                  onChange={(ev: any) => {
                    setCity(ev.label)
                    loadCounties(ev.value, ev.label)
                  }}
                />
              </div>

              <div className="input-block">
                <label htmlFor="county">Município</label>
                <Select
                  name="county"
                  options={counties}
                  placeholder="Selecionar município..."
                  onChange={(ev: any) => {
                    setCounty(ev.label)
                  }}
                />
              </div>
            </fieldset>

            <button className="confirm-button" type="submit">
              Procurar
            </button>
          </Form>
        </main>

        <Map
          center={location}
          zoom={4}
          style={{ width: "100%", height: "100%" }}
        >
          {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?${token}`}
          />

          {hearts.map((heart) => (
            <Marker
              key={heart.id}
              icon={mapHeartIcon}
              position={[heart.latitude, heart.longitude]}
            >
              <Popup
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                className="map-popup"
              >
                <div>

                  <h3>Adotar</h3>
                  <p>
                    Cuide bem da área selecionada
                  </p>
                  <Button type="button">Adotar</Button>
                  <CarouselImg showThumbs={false} latitude={heart.latitude} longitude={heart.longitude} />
                </div>
              </Popup>
            </Marker>
          ))}
        </Map>
      </Content>
    </Container>
  );
}

export { Maps };