module.exports = () => {
  return async (ctx, next) => {
    if (ctx.header.origin === process.env.FRONTENDURL) {
      const cookies = ctx.request.header.cookie || false;
      console.log(cookies);
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
    await next();
  };
};
