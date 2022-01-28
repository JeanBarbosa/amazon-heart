import axios from 'axios';

export const token = 'access_token=pk.eyJ1IjoiamVhbmJhcmJvc2EiLCJhIjoiY2p6YnlqeWRvMDBmajNocnNhamF0eDJ5bCJ9.kRPpMufw0bL4CBxdaHNafA';

const apiMapbox = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5',
});

export const fetchLocalMapBox = (local: string) =>
  apiMapbox.get(`mapbox.places/${local}.json?${token}`)
    .then(({ data }) => data);