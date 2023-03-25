module.exports = () => {
  return async (ctx, next) => {
    console.log(ctx.header.origin)
    if (ctx.header.origin === process.env.FRONTENDURL) {
      const cookies = ctx.request.header.cookie || false;
      console.log("cookie", cookies)
      if (cookies) {
        let token = cookies
          .split(";")
          .find((c) => c.trim().startsWith("jwt="))
          .split("=")[1];
        if (token) {
          ctx.request.header.authorization = `Bearer ${token}`;
        }
      }
    }
    console.log("updated header", ctx.request.header)
    await next();
  };
};
