/**
 * post controller
 */
import { factories } from "@strapi/strapi";
import content_schemas from "../../../../general-schemas";

export default factories.createCoreController(
  "api::post.post",
  ({ strapi }): {} => ({
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
        const temp = JSON.parse(ctx.request.body.data)
        temp.author = ctx.state.user.id;
        ctx.request.body.data = JSON.stringify(temp)
        return await super.create(ctx);
      } else {
        console.log("eta xu")
        ctx.request.body.author = ctx.state.user.id;
        return await super.create(ctx);
      }
    },
  })
);
