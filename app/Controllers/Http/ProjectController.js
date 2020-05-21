'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */

class ProjectController {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {AuthSession} ctx.auth
   */
  async index ({ request, auth }) {
    const projects = request.team.projects().fetch()

    return projects
  }

  /**
   * Create/save a new project.
   * POST projects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {AuthSession} ctx.auth
   */
  async store ({ request, auth }) {
    const data = request.only(['title'])
    const project = request.team.projects().create(data)

    return project
  }

  /**
   * Display a single project.
   * GET projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async show ({ params, request }) {
    const projects = request.team.projects().where('id', params.id).fetch()

    return projects
  }

  /**
   * Update project details.
   * PUT or PATCH projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async update ({ params, request }) {
    const data = request.only(['title'])
    const project = await request.team.projects()
      .where('id', params.id)
      .first()

    project.merge(data)

    await project.save()

    return project
  }

  /**
   * Delete a project with id.
   * DELETE projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async destroy ({ params, request }) {
    const project = await request.team.projects()
      .where('id', params.id)
      .first()

    await project.delete()

    project.save()
  }
}

module.exports = ProjectController
