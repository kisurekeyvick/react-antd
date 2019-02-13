# 基于之前Angular项目，使用React.js的方式重新实现
- 本项目用typescript为编程语言
- 应用开发工具使用create-react-app
- 组件库：antd 

## 运行与配置
- 使用yarn install将基本的配置加载下来
### react-app-rewired
- react-app-rewired的版本为1.6.2，如果是高于1.6.2的版本，则会报错
```
antd按需加载样式，就需要使用babel-import-plugin，在使用这个插件的时候，还需要react-app-rewired
    在2.0版本一下的时候
```
#### 解决方法
- 降版本，在package.json包里面："react-app-rewired": "1.6.2",
- [你也可以在webpack.config.js中修改配置](https://blog.csdn.net/weixin_39836173/article/details/86110011)
### SaaS配置
- [React搭建react环境及SCSS的配置](https://www.jianshu.com/p/9223b84a84ce)
```
node_modules/react-scripts/config/webpack.config.dev.js
具体的配置跟源码一起放在github上：详见[附录：webpack的scss配置：](https://github.com/toly1994328/React_Test/tree/master/%E9%99%84%E5%BD%95%EF%BC%9Awebpack%E7%9A%84scss%E9%85%8D%E7%BD%AE)
```
- webpack.config.dev.js  
```js
{
    // Exclude `js` files to keep "css" loader working as it injects
    // its runtime that would otherwise processed through "file" loader.
    // Also exclude `html` and `json` extensions so they get processed
    // by webpacks internal loaders.
    exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/, /\.(sass|scss)$/],
    loader: require.resolve('file-loader'),
    options: {
        name: 'static/media/[name].[hash:8].[ext]'
    },
},
{test: /\.(sass|scss)$/, 
    use: ['style-loader', 'css-loader',
        {
            loader: require.resolve('postcss-loader'),
            options: {
                // Necessary for external CSS imports to work
                // https://github.com/facebookincubator/create-react-app/issues/2677
                ident: 'postcss',
                plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                        browsers: [
                            '>1%',
                            'last 4 versions',
                            'Firefox ESR',
                            'not ie < 9', // React doesn't support IE8 anyway
                        ],
                        flexbox: 'no-2009',
                    }),
                ],
            },
        },
    'sass-loader']
},
```
- webpack.config.prod.js
```js
{
    {
        test: [/\.css$/, /\.(sass|scss)$/], // /\.css$/  
        loader: ExtractTextPlugin.extract(
            Object.assign(
            {
                fallback: {
                loader: require.resolve('style-loader'),
                options: {
                    hmr: false,
                },
                },
                use: [
                {
                    loader: require.resolve('css-loader'),
                    options: {
                    importLoaders: 1,
                    minimize: true,
                    sourceMap: shouldUseSourceMap,
                    },
                },
                {
                    loader: require.resolve('postcss-loader'),
                    options: {
                    // Necessary for external CSS imports to work
                    // https://github.com/facebookincubator/create-react-app/issues/2677
                    ident: 'postcss',
                    plugins: () => [
                        require('postcss-flexbugs-fixes'),
                        autoprefixer({
                        browsers: [
                            '>1%',
                            'last 4 versions',
                            'Firefox ESR',
                            'not ie < 9', // React doesn't support IE8 anyway
                        ],
                        flexbox: 'no-2009',
                        }),
                    ],
                    },
                },
                ],
            },
            extractTextPluginOptions
            )
        ),
        // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
    },
},
{
    loader: require.resolve('file-loader'),
    // Exclude `js` files to keep "css" loader working as it injects
    // it's runtime that would otherwise processed through "file" loader.
    // Also exclude `html` and `json` extensions so they get processed
    // by webpacks internal loaders.
    exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/, /\.(sass|scss)$/],
    options: {
        name: 'static/media/[name].[hash:8].[ext]',
    },
},
```
## mock数据暂时不上传
- 部分数据表面不够真实，有待修改

## Bug缺陷
```
antd有些组件interface给了限制，有时候会报错：Type '{ .... }' is not assignable to type 'IntrinsicAttributes & ...'
```
- Grid.d.ts
```ts
export interface CardGridProps {
    prefixCls?: string;
    style?: React.CSSProperties;
    className?: string;
    children?: any[];   // 这里需要添加，否则report那里会报错
}
```