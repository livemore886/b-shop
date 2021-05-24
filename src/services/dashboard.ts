import request from '@/utils/request';

export type dashBoardParamsType = {
    users_count: number;
    goods_count: number;
    order_count: number;
   
  };
/**
 * 获取统计面板数据
 * @param params 
 * @returns 
 */
export  function fetchDashBoard(params:dashBoardParamsType) {
    return request('/admin/index')
}