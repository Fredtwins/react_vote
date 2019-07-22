import request from '@/utils/request.js';
import request1 from '@/utils/req.js';
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

// 投票教师寄语
export async function MessageList(params) {
  return request1(`/tpSubject/listPage`, {
    method: 'post',
    body: params
    // interFaceType: 'tp'
  })
}

//查询投票列表TOP10
export async function getTpSubjectListTop10 (params) {
  // console.log("ininin", params)
  return request1(`/tpSubject/list?${stringify(params)}`);
}

// 校区信息
export async function getDept (params) {
  // console.log("ininin", params)
  return request(`/api/deptByToken?${stringify(params)}`,{
    interFaceType: 'jq'
  });
}

export async function getTpSubjectInfo (params) {
  return request1(`/tpRecord/info?${stringify(params)}`);
}

export async function putVote (params) {
  return request1(`/tpRecord/vote`, {
    method: 'put',
    body: params,
  })
}
export async function getCity (params) {
  return request1(`/tpAddress/list/1/1000/city?attr=province&${stringify(params)}`);
}
export async function getProvince (params) {
  return request1(`/tpAddress/list/1/1000/province`);
}
export async function getSchool (params) {
  console.log("ininin", params)
  return request1(`/tpAddress/list/1/1000/school?attr=city&${stringify(params)}`);
}
export async function getUserInfo (params) {
  console.log("ininin", params)
  return request(`/api/userInfo?${stringify(params)}`);
}

// export async function MessageList (params) {
//   console.log("ininin", params)
//   return request1(`/tpSubject/listPage`, {
//     method: 'POST',
//     data: params,
//     headers: { 'Content-Type': 'application/json' }
//   });
// }
