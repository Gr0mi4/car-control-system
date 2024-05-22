const path = require("path");

module.exports = {
  webpack: {
    alias: {
      components: path.resolve(__dirname, "src/components"),
      icons: path.resolve(__dirname, "src/assets/icons"),
      store: path.resolve(__dirname, "src/store"),
      views: path.resolve(__dirname, "src/views"),
      hooks: path.resolve(__dirname, "src/hooks"),
    },
  },
};