/** @type {import('next').NextConfig} */

const nextConfig = {
  // 针对Docker部署
  output: "standalone",
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
