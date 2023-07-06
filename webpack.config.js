const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const nodeExternals = require('webpack-node-externals')
const path = require('path')

module.exports = {
    entry: './src/@core/components/moderniza/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        libraryTarget: "umd"
    },
    module: {
        rules: [
            {
                test: /\.(jpg|png|gif|webp|svg)$/,
                use: {
                    loader: 'file-loader'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader: 'file-loader'
                }
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, 'src'),
            '@assets': path.resolve(__dirname, 'src/@core/assets'),
            '@components': path.resolve(__dirname, 'src/@core/components'),
            '@layouts': path.resolve(__dirname, 'src/@core/layouts'),
            '@store': path.resolve(__dirname, 'src/redux'),
            '@styles': path.resolve(__dirname, 'src/@core/scss'),
            '@configs': path.resolve(__dirname, 'src/configs'),
            '@utils': path.resolve(__dirname, 'src/utility/Utils'),
            '@hooks': path.resolve(__dirname, 'src/utility/hooks')
        },
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'bundle.css'
        })
    ],
    externals: [nodeExternals()]
}
