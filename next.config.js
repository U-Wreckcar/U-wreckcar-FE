/** @type {import('next').NextConfig} */
const nextConfig = {
  module: {
    // sassOptions: {
    //   includePaths: [path.join(__dirname, "styles")],
    // },
    env: {
      PUBLIC_URL: "/custom/path/to/public",
    },
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
