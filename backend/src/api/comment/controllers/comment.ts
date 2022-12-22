/**
 * comment controller
 */

import { factories } from "@strapi/strapi";
import content_schemas from "../../../../general-schemas";

export default factories.createCoreController(
  "api::comment.comment",
  ({ strapi }): {} => ({
    async create(
      ctx: any
    ): Promise<content_schemas.ResponseCollection<"api::post.post">> {
        console.log("body",ctx.request.body)
        console.log("userid",ctx.state.user.id)
      ctx.request.body.data.author = ctx.state.user.id;
      return await super.create(ctx);
    },
  })
);
