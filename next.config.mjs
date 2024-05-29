/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // 打包模式
  reactStrictMode: false, // 严格模式
  env: {
    REACT_NODE_ENV: process.env.NODE_ENV,
  }, // 设置全局参数
};

export default nextConfig;
