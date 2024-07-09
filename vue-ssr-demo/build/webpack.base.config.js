const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    context: path.resolve(__dirname, '../'),
    devtool: isProd ? 'source-map' : '#cheap-module-source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js',
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.css'],
        alias: {
            public: path.resolve(__dirname, '../public'),
            '@': path.resolve(__dirname, '../src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false,
                    },
                },
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                use: ['file-loader'],
            },
            {
                test: /\.(woff|eot|ttf)\??.*$/,
                loader: 'url-loader?name=fonts/[name].[md5:hash:hex:7].[ext]',
            },
        ],
    },
    plugins: [new VueLoaderPlugin()],
};
