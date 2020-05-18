'use strict'
const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    const { name, email, password } = request.all()

    const user = new User()
    user.name = name
    user.email = email
    user.password = password

    await user.save()
  }
}

module.exports = UserController
