'use strict'

class ProjectsCreateController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onMessage (data) {
    this.socket.broadcastToAll('message', data)
  }
}

module.exports = ProjectsCreateController
