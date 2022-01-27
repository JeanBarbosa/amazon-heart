import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import UserEmail from 'App/Mailers/UserEmail'

export default class ForgotPasswordsController {
  public async store({ response, request, auth }: HttpContextContract) {
    try {
      const email = request.input('email')
      const user = await User.findByOrFail('email', email)

      const { tokenHash: token } = await auth.use('api').generate(user, {
        expiresIn: '2days',
        name: 'Reset'
      })

      await new UserEmail({
        user,
        to: user.email,
        subject: 'Recuperação de Senha',
        template: 'emails/forgot_password',
        data: {
          token,
          link: `${request.input('redirect_url')}?token=${token}`
        }
      }).sendLater()

    } catch (err) {
      return response.status(403).send({
        error: {
          message: 'Algo não deu certo, esse e-mail existe?'
        }
      })
    }
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const { token, password } = request.all()

      const { user_id } = await Database.query().from('api_tokens').where('token', token).firstOrFail()
      const user = await User.findOrFail(user_id)

      user.password = password

      await user.save()
    } catch (err) {
      return response.status(401).send({
        error: {
          e: err.message,
          message: 'O token de recuperação está expirado'
        }
      })
    }
  }
}
