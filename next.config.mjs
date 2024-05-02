import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  webpack: (config, { isServer }) => {
    // Add file-loader rule to handle .node files
    config.module.rules.push({
      test: /\.node$/,
      use: {
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          publicPath: `/_next/static/chunks/`,
          outputPath: `${isServer ? "../" : ""}static/chunks/`,
        },
      },
    });

    // Resolve 'canvas' package to use the built version in Node.js
    if (isServer) {
      config.resolve.alias["canvas"] = path.resolve(
        __dirname,
        "node_modules/canvas/build/Release/canvas.node"
      );
    }

    return config;
  },
  images: {
    domains: ['i.giphy.com'],
  },
};
