module.exports = {
  lintOnSave: false,
  publicPath: '/',
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['postcss-loader']
        }
      ]
    }
  }
};
