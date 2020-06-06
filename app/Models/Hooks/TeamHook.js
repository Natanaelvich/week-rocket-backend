'use strict'

const Ws = use('Ws')

const TeamHook = exports = module.exports = {}

TeamHook.method = async (modelInstance) => {
}

TeamHook.sendWs = async (team) => {
  const topic = Ws.getChannel('teams').topic('teams')

  if (topic) {
    topic.broadcast('new:team', team)
  }
}
