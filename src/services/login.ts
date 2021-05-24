import request from '@/utils/request';


export type LoginParamsType = {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
};
/**
 * 执行登录，获取token
 * @param params 
 * @returns 
 */
export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/auth/login', {
    method: 'POST',
    data: params,
  });
}

export async function logout(){
  return request('/auth/logout',{
    method:'POST',
    
  })
}


