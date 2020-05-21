'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Invite = use('App/Models/Invite')

class UserController {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const { name, email, password } = request.all()

    const teamsQuery = Invite.query().where('email', email)
    const teams = await teamsQuery.pluck('team_id')

    if (teams.length === 0) {
      return response
        .status(401)
        .send({ message: 'You´re not invited to any team' })
    }

    const user = await User.create({ name, email, password })

    await user.teams().attach(teams)

    await teamsQuery.delete()

    const tocken = await auth.attempt(email, password)

    return tocken
  }
}

module.exports = UserController
