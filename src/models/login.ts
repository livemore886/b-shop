import { stringify } from 'querystring';
import type { Reducer, Effect } from 'umi';
import { history } from 'umi';

import { fakeAccountLogin } from '@/services/login';

import { getPageQuery } from '@/utils/utils';


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
      // 判断是否登录成功
      console.log('rs',response.status)
      if(response.status===undefined){
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

    logout() {
      const { redirect } = getPageQuery();
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
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
