import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserEmail from 'App/Mailers/UserEmail';
import User from 'App/Models/User';

export default class UsersController {
  public async store({ response, request }: HttpContextContract) {
    try {
      const data = request.only([
        'username',
        'email',
        'password'
      ])

      const user = await User.create(data)

      await new UserEmail({
        user,
        to: user.email,
        subject: 'Bem Vindo!',
        template: 'emails/welcome'
      }).sendLater()

      return user
    } catch (error) {
      return response.status(400).send({
        error: {
          message: 'Algo de errado aconteceu ao tentar salvar os dados do usuário.'
        }
      })
    }
  }

  public async update({ response, request, auth }: HttpContextContract) {
    try {
      const data = request.only([
        'username',
        'email',
        'password',
        'job',
        'tags'
      ])

      const user = await User.findOrFail(auth.use('api').user!.id)

      user.merge(data)

      await user.save()

      return user
    } catch (error) {
      return response.status(400).send({
        error: {
          message: 'Algo de errado aconteceu ao tentar salvar os dados do usuário.'
        }
      })
    }

  }
}
