import request from '@/utils/request.js';
import {
  stringify
} from 'qs';

// 轮播图
export async function querySwiperList(data) {
  return request('operate/api/h5/frontend/roundPictureList', {
    interFaceType: 'hj'
  });
}

// 积分
export async function fastestBuy(params) {
  return request(`operate/api/h5/activity/list/index?${stringify(params)}`, {
    interFaceType: 'hj'
  });
}

// 兴趣添加
export async function addInterest(params) {
  return request('goods/api/h5/v1/goodsInterest/add', {
    method: 'post',
    body: params,
    header: {'Content-Type':'application/json'},
    interFaceType: 'hj'
  });
}

// 投票城市选择渲染
export async function Listcity(params) {
  return request(`/api/deptByToken?${stringify(params)}`, {
    interFaceType: 'jq'
  });
}
