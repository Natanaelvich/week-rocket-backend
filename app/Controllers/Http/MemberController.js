"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const UserTeam = use("App/Models/UserTeam");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */

class MemberController {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index({ request }) {
    const members = await UserTeam.query()
      .where("team_id", request.team.id)
      .with("user")
      .with("roles")
      .fetch();

    return members;
  }

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async update({ request, params }) {
    const roles = request.input("roles");

    const teamJoin = await UserTeam.find(params.id);

    if (!teamJoin) {
      return teamJoin;
    }

    const response = await teamJoin.roles().sync(roles);

    return response;
  }
}

module.exports = MemberController;
