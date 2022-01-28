import axios from 'axios';
import { format, subMonths } from 'date-fns';
import * as https from 'https'

const apiINPE = axios.create({
  baseURL: 'http://www2.dgi.inpe.br',
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

async function searchImage(latitude: number, longitude: number) {

  const now = new Date()
  const currentDate = format(new Date(), 'yyyy-MM-dd')
  const lastMonth = format(subMonths(now, 1), 'yyyy-MM-dd')

  const datetime = `${lastMonth}T00:00:00/${currentDate}T23:59:00`
  console.log(datetime)

  const payload = {
    "providers": [
      {
        "name": "INPE-CDSR",
        "collections": [
          { "name": "AMAZONIA1_WFI_L2_DN" },
          { "name": "AMAZONIA1_WFI_L4_DN" },
          { "name": "CBERS4A_MUX_L2_DN" },
          { "name": "CBERS4A_MUX_L4_DN" },
          { "name": "CBERS4A_WFI_L2_DN" },
          { "name": "CBERS4A_WFI_L4_DN" },
          { "name": "CBERS4A_WPM_L2_DN" },
          { "name": "CBERS4A_WPM_L4_DN" }
        ],
        "method": "POST",
        "query": { "cloud_cover": { "lte": 50 } }
      }
    ],
    "bbox": [longitude, latitude, longitude, latitude],
    "datetime": datetime,
    "limit": 1
  }

  const { data } = await apiINPE.post('stac-compose/stac/search', payload)

  return data
}

export { apiINPE, searchImage };