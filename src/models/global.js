import { Listcity, MessageList, getTpSubjectListTop10, getDept, getTpSubjectInfo, putVote, getCity, getProvince, getSchool,getUserInfo } from '@/services/home.js'
// import { Listcity } from '../services/home'

export default {
  namespace: 'global',
  state: {
    isAgree:false,
    title:'教师投票',
    isShowQuickMenu: false,
    PageSizelist: 2
  },

  effects: {
    // 投票城市选择渲染
    *getListcity({ payload }, { call, put }) {
      const data = yield call(Listcity, payload);
      return data
    },
    *MessageList({ payload }, { call, put }) {
      // console.log(payload)
      const data = yield call(MessageList, payload);
      return data
    },
    // TOP10
    *getTpSubjectListTop10({ payload }, { call, put }) {
      const data = yield call(getTpSubjectListTop10, payload);
      return data
    },
    *getDept ({ payload }, { call, put }) {
      //call 执行异步函数  put 发出一个action
      const data = yield call(getDept, payload);
      return data
    },
    *getTpSubjectInfo ({ payload }, { call, put }) {
      //call 执行异步函数  put 发出一个action
      const data = yield call(getTpSubjectInfo,payload);
      return data
    },
    *putVote ({ payload }, { call, put }) {
      //call 执行异步函数  put 发出一个action
      const data = yield call(putVote,payload);
      return data
    },
    *getCity ({ payload }, { call, put }) {
      //call 执行异步函数  put 发出一个action
      const data = yield call(getCity, payload);
      return data
    },
    *getProvince({ payload }, { call, put }) {
      //call 执行异步函数  put 发出一个action
      const data = yield call(getProvince, payload);
      return data
    },
    *getSchool({ payload }, { call, put }) {
      //call 执行异步函数  put 发出一个action
      const data = yield call(getSchool, payload);
      return data
    },
    *getUserInfo({ payload }, { call, put }) {
      //call 执行异步函数  put 发出一个action
      const data = yield call(getUserInfo, payload);
      return data
    },
    // *loginByPhone({ payload }, { call, put }) {
    //   //call 执行异步函数  put 发出一个action
    //   const data = yield call(loginByPhone, payload);
    //   return data;
    // },
  },

  reducers: {
    changeAgreeStatus(state, { payload }) {
      return {
        ...state,
        isAgree: !state.isAgree,
      };
    },
    PageSizelist(state, { payload }) {
      return {
        ...state,
        PageSizelist: PageSizelist + 2
      }
    }
    // saveDict(state, { payload }) {
    //   return {
    //     ...state,
    //     dict: payload,
    //   };
    // },
    // hadSawAgree(state) {
    //   return {
    //     ...state,
    //     isAgree: true,
    //   };
    // },
    // setTitle(state,{payload}){
    //   return{
    //     ...state,
    //     title:payload.title
    //   }
    // },
    // changeMenuStatus(state){
    //   return{
    //     ...state,
    //     isShowQuickMenu:!state.isShowQuickMenu
    //   }
    // },
  },
};
