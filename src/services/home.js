import request from '@/utils/request';
import {
  stringify
} from 'qs';

// 轮播图
export async function querySwiperList(data) {
  return request('operate/api/h5/frontend/roundPictureList', {
    interFaceType: 'hj'
  });
}

// 分类
export async function queryCategoryList(data) {
  return request('goods/api/h5/v1/goodscategory/getRootAndSendLevelList', {
    interFaceType: 'hj'
  });
}

// 好课推荐
export async function goodLesson(params) {
  return request(`operate/api/h5/frontend/goodLessonList?${stringify(params)}`, {
    interFaceType: 'hj'
  });
}

// 积分
export async function fastestBuy(params) {
  return request(`operate/api/h5/activity/list/index?${stringify(params)}`, {
    interFaceType: 'hj'
  });
}
export async function productCategory(params) {
  return request(`goods/api/h5/v1/goodscategory/getRootAndSendLevelList?${stringify(params)}`, {
    interFaceType: 'hj'
  });
}
export async function hotNews(params) {
  return request(`inf/api/infInformation/infInformation/popular?${stringify(params)}`, {
    interFaceType: 'hj'
  });
}

// 兴趣列表
export async function getInterestList(params) {
  return request(`goods/api/h5/v1/goodsInterest/getInterestList?${stringify(params)}`, {
    interFaceType: 'hj'
  });
}

// 兴趣推荐
export async function getGoodsByCategoryId(params) {
  return request(`goods/api/h5/v1/goods/getGoodsByCategoryId?${stringify(params)}`, {
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
export async function getAdsense(params) {
  return request(`operate/api/frontend/advertisementList?${stringify(params)}`, {
    interFaceType: 'hj'
  });
}

// 商品推荐
export async function getRecommendation(params) {
  return request(`operate/api/h5/frontend/recommendCategoryList?${stringify(params)}`, {
    interFaceType: 'hj'
  });
}
export async function roundPictureList(params) {
  return request(`operate/api/h5/frontend/roundPictureList?${stringify(params)}`, {
    interFaceType: 'hj'
  });
}
export async function everyoneLearningList(params) {
  return request(`operate/api/frontend/everyoneLearningList?${stringify(params)}`, {
    interFaceType: 'hj'
  });
}

// 秒杀时间
export async function getTimeList(params) {
  return request(`operate/api/h5/activity/time?${stringify(params)}`, {
    interFaceType: 'hj'
  });
}
// 秒杀课程
export async function getDiscountList(params) {
  return request(`operate/api/h5/activity/list/index?${stringify(params)}`, {
    interFaceType: 'hj'
  });
}
