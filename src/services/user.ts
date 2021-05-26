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

/**
 * 获取用户列表
 * @returns 
 */
export async function getUserList(params):Promise<any> {
  
  return request('/admin/users',{params})
}
/**
 * 禁用和启用
 * @param uid 
 * @returns 
 */
export async function lockUser(uid):Promise<any> {
  
  return request.patch(`/admin/users/${uid}/lock`)
}
/**
 * 添加用户
 * @param params 
 * @returns 
 */
export async function addUser(params):Promise<any> {
  
  return request.post('/admin/users',{params})
}
/**
 * 更新用户信息
 * @param params 
 * @returns 
 */
export async function updateUser(editId,params):Promise<any> {
  
  return request.put(`/admin/users/${editId}`,{params})
}
/**
 * 用户详情
 * @param editId 
 *  
 * @returns 
 */
export async function checkUser(editId):Promise<any> {
  
  return request.get(`/admin/users/${editId}`)
}

