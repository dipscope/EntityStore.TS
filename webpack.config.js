const Path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        index: {
            import: './src/index.ts',
            filename: './index.js'
        }
    },
    output: {
        path: Path.resolve(__dirname, 'dist'),
        library: ['EntityStore', '[name]'],
        libraryTarget: 'umd',
        globalObject: 'this'
    },
    externals: {
        '@dipscope/type-manager': {
            root: ['TypeManager', 'index'],
            amd: '@dipscope/type-manager',
            commonjs2: '@dipscope/type-manager',
            commonjs: '@dipscope/type-manager'
        },
        '@dipscope/type-manager/core': {
            root: ['TypeManager', 'core'],
            amd: '@dipscope/type-manager/core',
            commonjs2: '@dipscope/type-manager/core',
            commonjs: '@dipscope/type-manager/core'
        }
    },
    plugins: [
        new CircularDependencyPlugin({
            exclude: /node_modules/,
            include: /src/,
            failOnError: true,
            allowAsyncCycles: false,
            cwd: process.cwd()
        })
    ],
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: [{
                loader: 'ts-loader',
                options: {
                    configFile: 'tsconfig.webpack.json'
                }
            }],
            exclude: /node_modules/,
            include: [
                Path.resolve(__dirname, 'src')
            ],
        }]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
};
