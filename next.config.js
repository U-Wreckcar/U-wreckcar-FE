/** @type {import('next').NextConfig} */
const nextConfig = {
  module: {
    rules: [
      {
        test: /\.(mp4|webm)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/video/",
            },
          },
        ],
      },
    ],
  },
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["localhost", "*"],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
