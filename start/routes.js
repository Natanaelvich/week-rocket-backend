"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", "HelloWordController.index");
Route.post("sessions", "SessionController.store").validator("Session");
Route.post("users", "UserController.store").validator("User");

Route.group(() => {
  Route.get("roles", "RoleController.index");

  Route.resource("teams", "TeamController")
    .apiOnly()
    .validator(new Map([[["teams.store", "teams.update"], ["Team"]]]));
}).middleware("auth");

Route.group(() => {
  Route.post("invites", "InviteController.store")
    .validator("Invite")
    .middleware("can:invites_create");

  Route.resource("projects", "ProjectController")
    .apiOnly()
    .validator(new Map([[["projects.store", "projects.update"], ["Project"]]]))
    .middleware(
      new Map([
        [["projects.store", "projects.update"], ["can:projects_create"]],
      ])
    );
  Route.get("members", "MemberController.index");
  Route.put("members/:id", "MemberController.update").middleware(
    "is:admnistrador"
  );

  Route.get("permissions", "PermisionController.show");
}).middleware(["auth", "team"]);
