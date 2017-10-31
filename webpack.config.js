const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: require.resolve('./lib/problem-search.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'problem-search.min.js',
        library: 'ProblemSearch',
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                include: [path.resolve(__dirname, 'lib')],
                exclude: [path.resolve(__dirname, 'node_modules')]
            },
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, 'lib')],
                exclude: [path.resolve(__dirname, 'node_modules')],
                loader: 'babel-loader',
                options: {
                    presets: ['env'],
                    plugins: ['transform-runtime']
                }
            }
        ]
    },
    plugins: [
        new UglifyJSPlugin()
    ]
};