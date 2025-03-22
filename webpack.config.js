const Path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        index: './src/index.ts'
    },
    output: {
        path: Path.resolve(__dirname, 'dist/umd'),
        filename: '[name].js',
        library: '$DSEntityStore',
        libraryTarget: 'umd',
        globalObject: 'this',
        umdNamedDefine: true
    },
    externals: {
        '@dipscope/type-manager': {
            commonjs: '@dipscope/type-manager',
            commonjs2: '@dipscope/type-manager',
            amd: '@dipscope/type-manager',
            root: '$DSTypeManager'
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
                    configFile: 'tsconfig/tsconfig.umd.json'
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
