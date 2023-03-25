module.exports = ({ env }) => ({
    // ...
    io: {
      enabled: true,
      config: {
        IOServerOptions: {
          cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true,
          },
        },
        contentTypes: {
          post: "*",
          comment: ["create"],
          user: "*",
        },
        events: [
          {
            name: "connection",
            handler: ({ strapi }, socket) => {
              strapi.log.info(`[io] new connection with id ${socket.id}`);
            },
          },
          {
            name: "updateuser",
            handler: ({ strapi }) => {
              strapi.$io.raw("user:update", "user updated");
            },
          },
          {
            name: "updateLikes",
            handler: ({ strapi }) => {
              strapi.$io.raw("likesUpdated", "likes updated");
            },
          },
        ],
      },
    },
    // ...
  });
  