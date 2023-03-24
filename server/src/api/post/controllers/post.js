"use strict";

/**
 * post controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const axios = require('axios')

module.exports = createCoreController("api::post.post", ({ strapi }) => ({
  async findFriendsPosts(ctx) {
    const posts = await super.find(ctx);
    let response = [];
    let followings = [];
    try {
      const user = await axios.get(`${process.env.STRAPI_URL}/api/users/me`, {
        params: {
          populate: ["followings"],
        },
        headers: {
          Authorization: ctx.request.header.authorization,
        },
      });
      followings = user.data.followings.map((user) => user.id);
    } catch (err) {
      console.log(err);
    }
    posts.data.forEach((post) => {
      if (followings.includes(post.attributes.author.data.id)) {
        response.push(post);
      }
    });
    return response;
  },
  async find(ctx) {
    const response = await super.find(ctx);
    return response;
  },

  async delete(ctx) {
    const postid = ctx.url.split("/")[3];
    const post = await strapi.db
      .query("api::post.post")
      .findOne({ populate: ["author", "content"], where: { id: postid } });
    if (post.author.id === ctx.state.user.id) {
      console.log("Yes you are author");
      return await super.delete(ctx);
    } else {
      ctx.response.status = 404;
      ctx.response.message = "Only Author can delete the post";
    }
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
