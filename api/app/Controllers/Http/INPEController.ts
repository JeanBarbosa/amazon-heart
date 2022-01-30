import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { INPEService } from '../../Services/INPEService'

export default class INPEController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const { latitude, longitude } = request.only([
        'latitude',
        'longitude',
      ])

      const satelites = new INPEService({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
      }).execute()

      return satelites

    } catch (error) {
      return response.status(400).send({
        error: {
          message: 'Algo de errado aconteceu ao tentar obter os dados do INPE.'
        }
      })
    }

  }
}
