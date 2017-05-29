const webpack = require('webpack');

module.exports = {
    context: `${__dirname}/views`,
    entry: {
        main: [
            './index.js'
        ]
    },
    output: {
        path: `${__dirname}/public`,
        publicPath: '/',
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'react-hot-loader'
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'react', 'stage-0'],
                            plugins: ['transform-decorators-legacy']
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                include: /components/,
                use: [
                    'style-loader',
                    'css-loader?modules&localIdentName=[name]_[local]_[hash:base64:5]',
                    'postcss-loader'
                ]
            },
            {
                test: /\.css$/,
                exclude: /components/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    'url-loader?limit=10000'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    }
}
