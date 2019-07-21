import { Listcity, MessageList } from '@/services/home.js'
// import { Listcity } from '../services/home'

export default {
  namespace: 'global',
  state: {
    isAgree:false,
    title:'教师投票',
    isShowQuickMenu: false,
  },

  effects: {
    // 投票城市选择渲染
    *getListcity({ payload }, { call, put }) {
      const data = yield call(Listcity, payload);
      return data
    },
    *MessageList({ payload }, { call, put }) {
      const data = yield call(MessageList, payload);
      return data
    }
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
