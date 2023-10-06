/** @type {import('next').NextConfig} */
const semi = require("@douyinfe/semi-next").default({});

const nextConfig = {
  ...semi,
  transpilePackages: [
    "@douyinfe/semi-ui",
    "@douyinfe/semi-icons",
    "@douyinfe/semi-illustrations",
  ],
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home/main",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
