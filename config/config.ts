// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  history: {
    type: 'browser',
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // 快速刷新功能 https://umijs.org/config#fastrefresh
  fastRefresh: {},
  esbuild: {},
  define: {
    CESIUM_BASE_URL: '/',
    BASE_URL: 'https://api.github.com/repos/zjyfantasy/myalbum/contents/images',
  },
  copy: [
    { from: 'node_modules/cesium/Build/Cesium/Workers', to: 'Workers' },
    { from: 'node_modules/cesium/Build/Cesium/ThirdParty', to: 'ThirdParty' },
    { from: 'node_modules/cesium/Build/Cesium/Assets', to: 'Assets' },
    { from: 'node_modules/cesium/Build/Cesium/Widgets', to: 'Widgets' },
  ],
});
