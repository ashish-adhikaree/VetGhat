/**
 * post controller
 */
import { factories } from "@strapi/strapi";
import content_schemas from "../../../../general-schemas";
import axios from "axios";

export default factories.createCoreController(
  "api::post.post",
  ({ strapi }): {} => ({
    async findFriendsPosts(
      ctx: any
    ): Promise<any[]> {
      const posts = await super.find(ctx);
      let response = []
      let followings = []
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
      // console.log(await strapi.db.query('api::post.post').findMany({where:{author: 1}}))
      posts.data.forEach((post)=>{
        if (followings.includes(post.attributes.author.data.id)){
          response.push(post)
        }
      })
      return response;
    },
    async find(
      ctx: any
    ): Promise<content_schemas.ResponseCollection<"api::post.post">> {
      const response = await super.find(ctx);
      return response;
    },

    async create(
      ctx: any
    ): Promise<content_schemas.ResponseCollection<"api::post.post"> | object> {
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
  })
);
