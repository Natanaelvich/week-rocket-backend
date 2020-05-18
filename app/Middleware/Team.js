'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */

class Team {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Function} next
   *@param {AuthSession} ctx.auth
   */
  async handle ({ request, response, auth }, next) {
    // call next to advance the request
    const slug = request.header('TEAM')

    let team = null

    if (slug) {
      team = await auth.user.teams().where('slug', slug).first()
    }
    if (!team) {
      return response.status(401).send()
    }

    auth.user.currentTeam = team.id
    request.team = team

    await next()
  }
}

module.exports = Team
