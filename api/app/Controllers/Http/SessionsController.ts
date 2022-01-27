import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'

export default class SessionsController {

  public async store({ response, request, auth }: HttpContextContract) {
    try {
      const { email, password } = request.all()

      // Lookup user manually
      const user = await User
        .query()
        .where('email', email)
        .firstOrFail()

      // Verify password
      if (!(await Hash.verify(user.password, password))) {
        return response.badRequest('Invalid credentials')
      }

      // Generate token
      const token = await auth.use('api').generate(user)

      return { ...token, user }

    } catch {

      return response.status(403).send({
        error: {
          message: 'Invalid credentials.'
        }
      })
    }
  }
}
