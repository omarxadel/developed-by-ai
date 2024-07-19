module.exports = {
  AUTH_COOKIE_NAME: "auth_ec",
  AUTH_COOKIE_MAX_AGE: 60 * 60 * 24 * 7,
  AUTH_COOKIE_SECURE: process.env.NODE_ENV === "production",
  AUTH_COOKIE_HTTP_ONLY: process.env.NODE_ENV === "production",
};
