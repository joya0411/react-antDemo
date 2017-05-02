var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: __dirname + '/src',
  entry: "./js/root.js",
  output: {
    path: __dirname + '/src/',
    filename:"bundle.js"
  },
  devServer: {
        contentBase: path.join(__dirname, "src"),
        compress: true,
        port: 9000,
        hot:true
  },
  devtool:debug ? 'inline-sourcemap' : false,
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins:['react-html-attrs']
        }
      },
      {
          test:/\.css?$/,
        //   loader:'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]--[hash:base64:5]'
        loader:'style-loader!css-loader'
      },
      {
        test:/.less$/,
        loader:'style-loader!css-loader!less-loader'
      }
    ]
  },
  plugins:debug?[
      new webpack.HotModuleReplacementPlugin(), //热加载
  ]:
  [
    new webpack.HotModuleReplacementPlugin(), //热加载
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ]
};
