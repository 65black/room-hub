const sassResourcesLoader = require('craco-sass-resources-loader');
module.exports = {
  mode: "development",
  output: {
      path: __dirname,
  },
  plugins: [
      {
          plugin: sassResourcesLoader,
          options: {
            resources: [
              './src/assets/style/colors.scss',
              './src/assets/style/spacing.scss',
              './src/assets/style/variables.scss',
              './src/assets/style/mixins.scss',
            ],
          },
      },
  ],
};
