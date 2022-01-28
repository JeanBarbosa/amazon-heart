import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class INPEController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const data = request.only([
        'latitude',
        'longitude',
      ])

      return data
    } catch (error) {
      return response.status(400).send({
        error: {
          message: 'Algo de errado aconteceu ao tentar obter os dados do INPE.'
        }
      })
    }

  }
}
