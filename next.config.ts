/** @type {import('next').NextConfig} */
const nextConfig = {
  // config パラメーターに型を指定します
  webpack: (config: { watchOptions: { poll: number; aggregateTimeout: number } }) => {
    config.watchOptions = {
      poll: 60,
      aggregateTimeout: 60,
    };
    return config;
  },

  // ビルド時のESLintエラーを無視する設定
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;