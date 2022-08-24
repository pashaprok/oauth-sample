export const appConfig = {
  port: process.env.PORT || 5050,
  domain:
    process.env.APP_DOMAIN || `http://localhost:${process.env.PORT || 5050}`,
};
