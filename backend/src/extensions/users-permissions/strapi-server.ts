module.exports = (plugin: { routes: { [x: string]: { routes: any[] } } }) => {
  for (let i = 0; i < plugin.routes["content-api"].routes.length; i++) {
    const route = plugin.routes["content-api"].routes[i];
    if (
      (route.method === "POST" &&
        route.path === "/users/:id" &&
        route.handler === "user.findOne")
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

  return plugin;
};
