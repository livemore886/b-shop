import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/users');
}
/**
 * 获取当前登录用户信息
 * @returns 
 */
export async function queryCurrent(): Promise<any> {
  return request('/admin/users');

}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
