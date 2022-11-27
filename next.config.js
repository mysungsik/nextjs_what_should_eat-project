const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "audtlr",
        mongodb_password: "lNbip9a0o2BUm0u2",
        mongodb_clustername: "eating",
        SECRET: "my_ms_secret",
        JWT_SECRET: "my_strong_jwt_secret",
      },
    };
  }
  return {
    env: {
      mongodb_username: "audtlr",
      mongodb_password: "lNbip9a0o2BUm0u2",
      mongodb_clustername: "eating",
      SECRET: "my_ms_secret",
      JWT_SECRET: "my_strong_jwt_secret",
    },
  };
};
