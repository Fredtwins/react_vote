import { IConfig } from 'umi-types';
// import {theme} from './package.json';
const theme = require('./package.json').theme;
// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  theme,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: false,
        dva: true,
        dynamicImport: { webpackChunkName: true },
        title: 'hangjia-h5',
        dll: true,

        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
  proxy: {
    '/hjBaseUrl': {
      target: 'http://10.0.98.187:10030',
      pathRewrite: {
        '^/hjBaseUrl': '/expert',
      },
      changeOrigin: true,
    },
    '/authBaseUrl': {
      target: 'http://hangjiah5.beta.hqjy.com',
      pathRewrite: {
        '^/authBaseUrl': '',
      },
      changeOrigin: true,
    },
    '/ljBaseUrl': {
      target: 'http://lctesthangjia.beta.hqjy.com',
      pathRewrite: {
        '^/ljBaseUrl': '',
      },
      changeOrigin: true,
    },
    '/daka': {
      target: 'http://10.0.98.83:8888',
      pathRewrite: {
        '^/daka': '',
      },
      changeOrigin: true,
    },
  },
  extraPostCSSPlugins: [
    require('autoprefixer'),
    require('postcss-flexbugs-fixes'),
    require('postcss-px-to-viewport')({
      viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: true, // 允许在媒体查询中转换`px`
    }),
  ],
  extraBabelPlugins: [['import', { libraryName: 'antd-mobile', style: true }]],
  targets: {
    chrome: 49,
    firefox: 45,
    safari: 10,
    edge: 13,
    ios: 9,
    android: 4.4,
  },
};

export default config;
