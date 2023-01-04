import { getService } from "@strapi/plugin-users-permissions/server/utils";
module.exports = (plugin) => {
  for (let i = 0; i < plugin.routes["content-api"].routes.length; i++) {
    const route = plugin.routes["content-api"].routes[i];
    if (
      route.method === "PUT" &&
      route.path === "/users/:id" &&
      route.handler === "user.update"
    ) {
      console.log(route);
      plugin.routes["content-api"].routes[i] = {
        ...route,
        config: {
          ...route.config,
          policies: route.config.policies
            ? [...route.config.policies, "global::isOwner"] // tests if policies were defined
            : ["global::isOwner"],
        },
      };
    }
  }

  plugin.controllers.user.searchUsers = async (ctx) => {
    const url = new URL(ctx.url, process.env.STRAPI_URL);
    const searchParams = new URLSearchParams(url.search);
    const name = searchParams.get("name");
    let response = [];
    const users = await getService("user").fetchAll(ctx.query);
    users.forEach((user) => {
      if(user.username.toLowerCase().includes(name.toLowerCase())){
        response.push({
          id: user.id,
          username: user.username,
          profilepic: user.profilepic
        })
      }
    });
    return response
  };

  plugin.routes["content-api"].routes.push({
    method: "GET",
    path: "/search",
    handler: "user.searchUsers",
  });

  return plugin;
};
