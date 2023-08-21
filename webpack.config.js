const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')
const glob = require('glob')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const mainPath = isDev ? 'dist' : 'public'
const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[fullhash].${ext}`)

const PATHS = {
    js: `js`,
    images: `${mainPath}/images`,
    icons: `${mainPath}/icons`,
    videos: `${mainPath}/videos`,
    css: 'css',
}

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all',
            automaticNameDelimiter: '_',
        },
    }

    if (isProd) {
        config.minimizer = [new CssMinimizerPlugin(), new TerserWebpackPlugin()]
    }

    return config
}

const plugins = () => {
    const base = [
        new HTMLWebpackPlugin({
            filename: `index.html`,
            template: './index.html',
            minify: isProd,
        }),

        new HTMLWebpackPlugin({
            filename: `ru/index.html`,
            template: './ru/index.html',
            minify: isProd,
        }),

        new HTMLWebpackPlugin({
            filename: `en/index.html`,
            template: './en/index.html',
            minify: isProd,
        }),

        new CleanWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename: `${PATHS.css}/${filename('css')}`,
        }),

        new PurgeCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'src/**/*'), { nodir: true }),
        }),

        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets/images'),
                    to: path.join(__dirname, PATHS.images),
                },

                {
                    from: path.resolve(__dirname, 'src/assets/icons'),
                    to: path.join(__dirname, PATHS.icons),
                },

                // {
                //     from: path.resolve(__dirname, 'src/assets/videos'),
                //     to: path.join(__dirname, PATHS.videos),
                // },
            ],
        }),
    ]

    return base
}

const cssLoaders = (extra) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: ``,
            },
        },
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    config: path.resolve(__dirname, 'postcss.config.js'),
                },
            },
        },
    ]

    if (extra) {
        loaders.push(extra)
    }

    return loaders
}

const babelOptions = (preset) => {
    const opts = {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties'],
    }

    if (preset) {
        opts.presets.push(preset)
    }

    return opts
}

const jsLoaders = () => {
    const loaders = [
        {
            loader: 'babel-loader',
            options: babelOptions(),
        },
    ]

    if (isDev) {
        loaders.push('eslint-loader')
    }

    return loaders
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: process.env.NODE_ENV,
    entry: {
        index: ['@babel/polyfill', './index.js'],
    },
    output: {
        filename: `${PATHS.js}/${filename('js')}`,
        path: path.resolve(__dirname, mainPath),
    },
    optimization: optimization(),
    devServer: {
        port: 4200,
        hot: isDev,
        liveReload: true,
    },
    devtool: isDev && 'source-map',
    plugins: plugins(),
    resolve: {
        extensions: ['.js', '.png', '.jpg', '.svg', '.css', '.sass', '.scss'],
        alias: {
            '@': path.resolve(__dirname, 'src/assets'),
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders(),
            },

            {
                test: /\.s[ac]ss$/i,
                use: cssLoaders('sass-loader'),
            },

            {
                test: /\.(png|jpg|svg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: '[name].[ext]',
                            outputPath: `../images/`,
                        },
                    },
                ],
            },

            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: jsLoaders(),
            },
        ],
    },
}
