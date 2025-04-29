const webpack = require('webpack')

module.exports = {
  webpack: {
    configure: webpackConfig => {
      webpackConfig.resolve.fallback = {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        assert: require.resolve('assert'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify'),
        url: require.resolve('url'),
        path: require.resolve('path-browserify'),
        'process/browser': require.resolve('process/browser'),
      }

      webpackConfig.plugins = (webpackConfig.plugins || []).concat([
        new webpack.ProvidePlugin({
          process: 'process/browser', // Polyfill for process
        }),
      ])

      return webpackConfig
    },
  },
}
