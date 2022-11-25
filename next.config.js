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
      },
    };
  }
  return {
    env: {
      mongodb_username: "audtlr",
      mongodb_password: "lNbip9a0o2BUm0u2",
      mongodb_clustername: "eating",
    },
  };
};
