const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');
const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

const plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(
            process.env.NODE_ENV || 'development'
        ),
        'process.env.VUE_ENV': '"server"',
    }),
    new VueSSRServerPlugin(),
];

module.exports = merge(base, {
    target: 'node',
    devtool: '#source-map',
    entry: './src/entry-server.js',
    output: {
        filename: 'server-bundle.js',
        libraryTarget: 'commonjs2',
    },
    externals: nodeExternals({
        allowlist: /\.css$/, // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖
    }),
    plugins,
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader'],
            },
        ],
    },
});
