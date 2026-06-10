/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // 型エラーがあっても強制公開する
  },
  eslint: {
    ignoreDuringBuilds: true, // 警告があっても無視する
  },
};

module.exports = nextConfig;