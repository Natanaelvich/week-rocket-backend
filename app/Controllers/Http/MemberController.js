'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const UserTeam = use('App/Models/UserTeam')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */

class MemberController {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index ({ request }) {
    // const members = await UserTeam.QueryBuilder(
    //   'select `users`.*, `user_team`.`user_id` as `pivot_user_id`, `user_team`.`user_team_id` as `pivot_user_team_id` from `users` inner join `user_team` on `users`.`id` = `user_team`.`user_id` where `user_team`.`user_team_id` in (1)'
    // )
    const members = await UserTeam.query()
      .where('team_id', request.team.id)
      .with('roles')
      .with('user')
      .fetch()

    return members
  }

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async update ({ request, params }) {
    const roles = request.input('roles')

    const teamJoin = await UserTeam.find(params.id)

    await teamJoin.roles().sync(roles)
  }
}

module.exports = MemberController
