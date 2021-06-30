import { parse } from 'querystring';
import React from 'react';
import * as babel from '@babel/standalone';
import { allComponents } from '@/pages/Sortable/config';
/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// For the official demo site, it is used to turn off features that are not needed in the real development environment
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

/**
 * 获取参数数据类型
 * @param data object获取数据类型
 * @returns string 数据类型
 */
export const getDataType = (data: any) => {
  return Object.prototype.toString.call(data).replace('[', '').replace(']', '').split(' ')[1];
};

/**
 * 创建节点
 * @param data onject 节点树对象
 * @returns element 节点
 */
export const createElement = (data: any) => {
  return React.createElement(
    allComponents[data.name],
    { ...data.defaultProps, ...data.props, ['data-item']: JSON.stringify(data) },
    data.children,
  );
};

/**
 * 转换字符串函数为可执行函数
 * @param jsx string 包含jsx的函数字符串
 * @returns function 返回可执行函数
 */
export const jsx2function = (jsx: string) => {
  let renderMethod = babel.transform(jsx, {
    presets: ['env', 'react'],
    plugins: ['transform-react-jsx'],
  }).code;
  renderMethod = renderMethod?.replace(`"use strict";`, '');
  return eval(`false||${renderMethod}`);
};
