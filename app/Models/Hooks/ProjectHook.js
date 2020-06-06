'use strict'

const Ws = use('Ws')

const ProjectHook = exports = module.exports = {}

ProjectHook.method = async (modelInstance) => {
}

ProjectHook.sendWs = async (project) => {
  const topic = Ws.getChannel('projects').topic('projects')

  if (topic) {
    topic.broadcast('new:project', project)
  }
}
