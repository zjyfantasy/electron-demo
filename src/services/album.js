import request from '@/utils/request';

/**
 * 查询效果图
 * @param {String} planId
 */
export async function queryImagesList(planId) {
  return await request('/', {
    params: {},
  });
}

export async function getFile(sha) {
  return await request(`https://api.github.com/repos/zjyfantasy/myalbum/git/blobs/${sha}`, { prefix: '' });
}

export async function upload(params) {
  return await request(`/${params.fileName}`, {
    method: 'PUT',
    data: params.data,
  });
}

export async function deleteFile(params) {
  return await request(`/${params.fileName}`, {
    method: 'DELETE',
    data: params.data,
  });
}
