'use strict'

class Team {
  get ValidateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required'
    }
  }
}

module.exports = Team
