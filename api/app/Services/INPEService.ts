import axios from 'axios';
import { format, subMonths } from 'date-fns';
import * as https from 'https'

export interface IRequestINPE {
  latitude: number;
  longitude: number;
}

class INPEService {

  private collections = [
    { "name": "AMAZONIA1_WFI_L2_DN" },
    { "name": "AMAZONIA1_WFI_L4_DN" },
    { "name": "CBERS4A_MUX_L2_DN" },
    { "name": "CBERS4A_MUX_L4_DN" },
    { "name": "CBERS4A_WFI_L2_DN" },
    { "name": "CBERS4A_WFI_L4_DN" },
    { "name": "CBERS4A_WPM_L2_DN" },
    { "name": "CBERS4A_WPM_L4_DN" }
  ];

  constructor(private coordinates: IRequestINPE) { }

  private formatDate() {
    const now = new Date()
    const currentDate = format(new Date(), 'yyyy-MM-dd')
    const lastMonth = format(subMonths(now, 1), 'yyyy-MM-dd')

    return `${lastMonth}T00:00:00/${currentDate}T23:59:00`
  }

  async execute() {

    const apiINPE = axios.create({
      baseURL: 'http://www2.dgi.inpe.br',
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    });

    const datetime = this.formatDate()

    const payload = {
      "providers": [
        {
          "name": "INPE-CDSR",
          "collections": this.collections,
          "method": "POST",
          "query": { "cloud_cover": { "lte": 40 } }
        }
      ],
      "bbox": [
        this.coordinates.longitude,
        this.coordinates.latitude,
        this.coordinates.longitude,
        this.coordinates.latitude
      ],
      "datetime": datetime,
      "limit": 1
    }

    const { data, status } = await apiINPE.post('stac-compose/stac/search', payload)

    if (status !== 200) {
      return []
    }

    return this.parseResponseData(data["INPE-CDSR"])

  }

  //Procura no objeto retornado do WS as informacoes relevantes
  private parseResponseData(obj: any) {

    let satelitesArray: Array<any> = []

    for (let i = 0; i < this.collections.length; ++i) {
      for (let x = 0; x < obj[this.collections[i].name].features.length; ++x) {
        const satelite = obj[this.collections[i].name].features[x]
        const { id, collection, properties, assets } = satelite
        const { thumbnail } = assets

        satelitesArray.push({
          id,
          collection,
          properties,
          thumbnail
        })
      }
    }

    return satelitesArray
  }


}

export { INPEService }
