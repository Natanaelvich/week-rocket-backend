'use strict'

const Role = use('Adonis/Acl/Role')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */

class RoleController {
  /**
   * @param {object} ctx
   * @param {AuthSession} ctx.auth
   * @param {Request} ctx.request
   */

  async index () {
    const roles = await Role.all()

    return roles
  }
}

module.exports = RoleController
