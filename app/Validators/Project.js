'use strict'

class Project {
  get ValidateAll () {
    return true
  }

  get rules () {
    return {
      title: 'required'
    }
  }
}

module.exports = Project
