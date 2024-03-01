const webpack = require('webpack');
const path = require('path')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin 代码体积分析
const CompressionWebpackPlugin = require('compression-webpack-plugin') // gzip 压缩，需要配置 nginx:gzip_static on;
module.exports = {
    publicPath:"./",
    outputDir:"dist",
    assetsDir:'static',
    configureWebpack: {
        plugins:[
            // 减少moment体积
            new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/)
            // ,
            // new BundleAnalyzerPlugin(
            //     {
            //         analyzerMode: 'server',
            //         analyzerHost: '127.0.0.1',
            //         analyzerPort: 8889,
            //         reportFilename: 'report.html',
            //         defaultSizes: 'parsed',
            //         openAnalyzer: true,
            //         generateStatsFile: false,
            //         statsFilename: 'stats.json',
            //         statsOptions: null,
            //         logLevel: 'info'
            //     }
            // ),
            ,
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]', // 生成的文件名
                algorithm: 'gzip', // 类型
                test: new RegExp('\\.(js|css)$'), // 匹配规则
                threshold: 10240, // 字节数 只处理比这个大的资源
                minRatio: 0.6 // 压缩率 只有比这个小的才会处理
            })
        ],
        resolve: {
            // 减少icons体积
            alias: {
                "@ant-design/icons/lib/dist$": path.resolve(__dirname, "./src/assets/icons.js")
            }
        },
        // 引入外部模块，减少打包体积
        externals: {
            'xlsx': 'XLSX',
            'jschardet':'jschardet'
        }
    }
}
