"use strict";

/**
 * post controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const { getService } = require("@strapi/plugin-users-permissions/server/utils");

module.exports = createCoreController("api::post.post", ({ strapi }) => ({
  async findFriendsPosts(ctx) {
    let response = [];
    let followings = [];
    try {
      const posts = await super.find(ctx);
      const user = await getService("user").fetch(1, {
        populate: ["followings"],
      });
      followings = user.followings.map((user) => user.id);
      console.log(followings);
      posts.data.forEach((post) => {
        if (followings.includes(post.attributes.author.data.id)) {
          response.push(post);
        }
      });
    } catch (err) {
      console.log(err);
    }
    return response;
  },

  async delete(ctx) {
    const postid = ctx.url.split("/")[3];
    const post = await strapi.db
      .query("api::post.post")
      .findOne({ populate: ["author", "content"], where: { id: postid } });
    if (post.author.id === ctx.state.user.id) {
      post.content.map(async (item) => {
        try {
          // This will delete the image entry from Strapi.
          const imageEntry = await strapi.db
            .query("plugin::upload.file")
            .delete({
              where: { id: item.id },
            });
          // This will delete corresponding image files under the *upload* folder.
          await strapi.plugins.upload.services.upload.remove(imageEntry);
        } catch (err) {
          console.log(err);
        }
      });
      console.log("Yes you are author");
      console.log(post);
      return await super.delete(ctx);
    } else {
      ctx.response.status = 404;
      ctx.response.message = "Only Author can delete the post";
    }
  },

  async find(ctx) {
    const response = await super.find(ctx);
    return response;
  },

  async create(ctx) {
    if (ctx.is("multipart")) {
      const temp = JSON.parse(ctx.request.body.data);
      temp.author = ctx.state.user.id;
      ctx.request.body.data = JSON.stringify(temp);
      return await super.create(ctx);
    } else {
      ctx.request.body.author = ctx.state.user.id;
      return await super.create(ctx);
    }
  },
}));
