import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Container } from './styles';
import api from '../../services/api'
import { format } from 'date-fns'

export interface Props {
  latitude: number;
  longitude: number;
  showThumbs?: boolean;
}

export interface ISatelite {
  id: string;
  collection: string;
  properties: any;
  thumbnail: any;
}

const CarouselImg: React.FC<Props> = ({ latitude, longitude, showThumbs = true }) => {

  const [satelites, setSatelites] = useState<ISatelite[]>([])

  useEffect(() => {
    api.get('inpe', {
      params: { latitude, longitude }
    }).then(({ data }) => {
      console.log(data)
      setSatelites(data)
    })
  }, [])

  return (
    <Container>
      {/* <h1>Ultimas imagens do satelites</h1> */}
      <Carousel
        showThumbs={showThumbs}
        showStatus={false}
        infiniteLoop
        // emulateTouch
        // autoPlay
        useKeyboardArrows
        transitionTime={1000}
        // axis="vertical"
        // selectedItem={1}
        width="600px"
        showIndicators={showThumbs}
      >
        {
          satelites.map((item, index) => (
            <div key={index} className="slide-holder">
              <img
                alt={item.id}
                src={item.thumbnail.href}
              />
              <div className="text-container">
                <h2>{item.collection}</h2>
                <p>Satelite: {item.properties.satellite}</p>
                <p>
                  Data: {format(new Date(item.properties.datetime), 'dd/MM/yyyy H:m')}
                </p>
                <p>sensor: {item.properties.sensor}</p>
                <p>cobertura de nuvens: {item.properties.cloud_cover}%</p>
              </div>
            </div>
          ))
        }
      </Carousel>
    </Container>
  );
}

export default CarouselImg;
