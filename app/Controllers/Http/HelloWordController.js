"use strict";

class HelloWordController {
  async index({ request }) {
    const user = [
      {
        id: 1,
        name: "natan",
      },
      {
        id: 2,
        name: "natan",
      },
      {
        id: 3,
        name: "natassia",
      },
    ];
    return user;
  }
}

module.exports = HelloWordController;
