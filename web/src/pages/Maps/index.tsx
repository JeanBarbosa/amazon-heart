import "leaflet/dist/leaflet.css";

import React, { FormEvent, useState, useEffect } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import Leaflet from "leaflet";
import { v4 as uuidv4 } from "uuid";

import { fetchLocalMapBox, token } from "../../services/mapbox";
//import AsyncSelect from "react-select/async";
import Select from 'react-select'

import mapPackage from "../../assets/map/package.svg";
import mapPin from "../../assets/map/pin.svg";
import { Container, Content } from './styles'
import { getStates, getCities, getCounties } from '../../services/ibge'

const initialPosition = { lat: -3.044653, lng: -60.1071926 };

const mapPackageIcon = Leaflet.icon({
  iconUrl: mapPackage,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

const mapPinIcon = Leaflet.icon({
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

function Maps() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  const [position, setPosition] = useState<Position | null>(null);
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [counties, setCounties] = useState([]);

  const [location, setLocation] = useState(initialPosition);

  const loadOptions = async (inputValue: any, callback: any) => {
    const response = await fetchLocalMapBox(inputValue);

    let places: any = [];
    if (inputValue.length < 5) return;
    response.features.map((item: any) => {
      places.push({
        label: item.place_name,
        value: item.place_name,
        coords: item.center,
        place: item.place_name,
      });
    });

    callback(places);
  };

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

  const loadCities = async (uf: string) => {
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

  const loadCounties = async (city: string) => {
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

  const handleChangeSelect = (event: any) => {

    setPosition({
      longitude: event.coords[0],
      latitude: event.coords[1],
    });

    setLocation({
      lng: event.coords[0],
      lat: event.coords[1],
    });
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    //if (!state || !city) return;

    setHearts([
      ...hearts,
      {
        id: uuidv4(),
        latitude: location.lat,
        longitude: location.lng,
      },
    ]);

    setPosition(null);
  }

  useEffect(() => {
    loadStates()
  }, [])

  return (
    <Container>
      <Content>
        <main>
          <form onSubmit={handleSubmit} className="landing-page-form">
            <fieldset>
              <legend>Procurar</legend>

              <div className="input-block">
                <label htmlFor="state">Estado</label>
                <Select
                  name="state"
                  classNamePrefix="filter"
                  options={states}
                  placeholder="Selecionar estado..."
                  onChange={(ev: any) => {
                    loadCities(ev.value)
                  }}
                />
              </div>
              <div className="input-block">
                <label htmlFor="city">Cidade</label>
                <Select
                  name="city"
                  classNamePrefix="filter"
                  options={cities}
                  placeholder="Selecionar cidade..."
                  onChange={(ev: any) => {
                    loadCounties(ev.value)
                  }}
                />
              </div>

              <div className="input-block">
                <label htmlFor="county">Município</label>
                <Select
                  name="county"
                  classNamePrefix="filter"
                  options={counties}
                  placeholder="Selecionar município..."
                />
              </div>

              {/* <div className="input-block">
                <label htmlFor="address">Endereço</label>
                <AsyncSelect
                  placeholder="Digite o endereço..."
                  classNamePrefix="filter"
                  cacheOptions
                  loadOptions={loadOptions}
                  onChange={handleChangeSelect}
                  value={address}
                />
              </div> */}
            </fieldset>

            <button className="confirm-button" type="submit">
              Procurar
            </button>
          </form>
        </main>

        <Map
          center={location}
          zoom={15}
          style={{ width: "100%", height: "100%" }}
        >
          {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?${token}`}
          />

          {position && (
            <Marker
              icon={mapPinIcon}
              position={[position.latitude, position.longitude]}
            ></Marker>
          )}

          {hearts.map((heart) => (
            <Marker
              key={heart.id}
              icon={mapPackageIcon}
              position={[heart.latitude, heart.longitude]}
            >
              <Popup
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                className="map-popup"
              >
                <div>
                  <h3>TEST 1</h3>
                  <p>
                    Loreip sum
                  </p>
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