/** @type {import('next').NextConfig} */

const nextConfig = {
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
