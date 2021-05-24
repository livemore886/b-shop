
import type { Reducer, Effect } from 'umi';
import { history } from 'umi';

import { fakeAccountLogin,logout } from '@/services/login';
import {message} from 'antd';




export type StateType = {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
};

export type LoginModelType = {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
};

const Model: LoginModelType = {
  namespace: 'login',
  state: {   
  },
  effects: {
    *login({ payload }, { call, put }) {
      // 发送请求执行登录
      const response = yield call(fakeAccountLogin, payload);
      console.log('response', response)
      // 判断是否登录成功
      console.log('rs',response.status)
      if(response.status===undefined){
        message.success('登录成功')
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
        // 跳转到首页
        history.replace( '/');
      }
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });

    },
    // 退出登录
    *logout(_,{call}) {
     const load =  message.loading('退出中...')
    // 请求API退出登录
      const response = yield call(logout)
      if(response.status===undefined){
       message.success('退出成功')
       // 删除本地存储的token和userInfo
       localStorage.removeItem('access_token')
       localStorage.removeItem('userInfo')

       // 重定向
       history.replace('/user/login')
      }
    load()
    
     
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      // 将token存入localStorage
      localStorage.setItem('access_token',payload.access_token)
      return {
        ...state
       
      };
    },
  },
};

export default Model;
