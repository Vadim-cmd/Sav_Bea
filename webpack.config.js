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

const mainPath = isDev ? 'dist' : 'public'
const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[fullhash].${ext}`)

const PATHS = {
    js: `js`,
    images: `${mainPath}/images`,
    icons: `${mainPath}/icons`,
    videos: `${mainPath}/videos`,
    css: 'css',
}

const optimization = {
    splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '_',
    },
    minimizer: [new CssMinimizerPlugin(), new TerserWebpackPlugin()],
}

const plugins = () => {
    const pages = ['index.html', 'ru/index.html', 'en/index.html']

    return [
        ...pages.map(
            (page) =>
                new HTMLWebpackPlugin({
                    filename: page,
                    template: `./${page}`,
                    minify: isDev,
                    scriptLoading: 'blocking',
                })
        ),

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
            ],
        }),
    ]
}

const cssLoaders = (extra) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: '',
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
    optimization,
    devServer: {
        port: 4200,
        hot: isDev,
        liveReload: true,
    },
    devtool: isDev ? 'source-map' : false,
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
                sideEffects: true,
            },

            {
                test: /\.s[ac]ss$/i,
                use: cssLoaders('sass-loader'),
                sideEffects: true,
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
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            disable: isDev,
                        },
                    },
                ],
            },

            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: jsLoaders(),
                sideEffects: true,
            },
        ],
    },
}
