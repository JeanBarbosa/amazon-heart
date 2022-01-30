import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios';
import { format, subMonths } from 'date-fns';
import * as https from 'https'

export default class INPEController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const { latitude, longitude } = request.only([
        'latitude',
        'longitude',
      ])

      const apiINPE = axios.create({
        baseURL: 'http://www2.dgi.inpe.br',
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        })
      });

      const now = new Date()
      const currentDate = format(new Date(), 'yyyy-MM-dd')
      const lastMonth = format(subMonths(now, 1), 'yyyy-MM-dd')

      const datetime = `${lastMonth}T00:00:00/${currentDate}T23:59:00`

      const collections = [
        { "name": "AMAZONIA1_WFI_L2_DN" },
        { "name": "AMAZONIA1_WFI_L4_DN" },
        { "name": "CBERS4A_MUX_L2_DN" },
        { "name": "CBERS4A_MUX_L4_DN" },
        { "name": "CBERS4A_WFI_L2_DN" },
        { "name": "CBERS4A_WFI_L4_DN" },
        { "name": "CBERS4A_WPM_L2_DN" },
        { "name": "CBERS4A_WPM_L4_DN" }
      ];

      const payload = {
        "providers": [
          {
            "name": "INPE-CDSR",
            "collections": collections,
            "method": "POST",
            "query": { "cloud_cover": { "lte": 40 } }
          }
        ],
        "bbox": [parseFloat(longitude), parseFloat(latitude), parseFloat(longitude), parseFloat(latitude)],
        "datetime": datetime,
        "limit": 1
      }

      const { data, status } = await apiINPE.post('stac-compose/stac/search', payload)

      if (status !== 200) {
        return response.status(400).send({
          error: {
            message: 'Erro ao buscar os dados do INPE.'
          }
        })
      }

      const obj = data["INPE-CDSR"];

      let satelitesArray: Array<any> = []

      for (let i = 0; i < collections.length; ++i) {
        for (let x = 0; x < obj[collections[i].name].features.length; ++x) {
          const satelite = obj[collections[i].name].features[x]
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

    } catch (error) {
      return response.status(400).send({
        error: {
          message: 'Algo de errado aconteceu ao tentar obter os dados do INPE.'
        }
      })
    }

  }
}
