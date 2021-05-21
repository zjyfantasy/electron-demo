import request from '@/utils/request';

export type LoginParamsType = {
  userName: string;
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
  const { password, userName, type } = params;
  if (password === 'ant.design' && userName === 'admin') {
    return Promise.resolve({ status: 'ok', type, currentAuthority: 'admin' });
  }
  if (password === 'ant.design' && userName === 'user') {
    return Promise.resolve({
      status: 'ok',
      type,
      currentAuthority: 'user',
    });
  }
  return Promise.reject({ status: 'error', message: '账号密码错误' });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
