import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Acl {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>, allowedRoles: string
  ) {

    const user = await auth.use('api').authenticate()

    if (!allowedRoles.includes(user.roles)) {
      return response.unauthorized()
    }

    await next()
  }
}
