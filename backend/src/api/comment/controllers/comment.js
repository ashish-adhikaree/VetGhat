"use strict";

/**
 * comment controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::comment.comment", ({ strapi }) => ({
  async create(ctx) {
    ctx.request.body.data.author = ctx.state.user.id;
    return await super.create(ctx);
  },
}));
