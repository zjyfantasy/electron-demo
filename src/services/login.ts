import request from '@/utils/request';
import { waitTime } from '@/utils/utils';

export type LoginParamsType = {
  username: string;
  password: string;
  mobile: string;
  captcha: string;
  type: string;
};

export async function fakeAccountLogin(params: LoginParamsType) {
  // return request('/api/login/account', {
  //   method: 'POST',
  //   data: params,
  // });
  await waitTime(2000);
  const { password, username, type } = params;
  if (password === 'ant.design' && username === 'admin') {
    return { status: 'ok', type, currentAuthority: 'admin' };
  }
  if (password === 'ant.design' && username === 'user') {
    return {
      status: 'ok',
      type,
      currentAuthority: 'user',
    };
  }
  return { status: 'error', message: '账号或密码错误' };
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
