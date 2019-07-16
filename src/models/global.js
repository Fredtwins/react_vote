
export default {
  namespace: 'global',
  state: {
    isAgree:false,
    title:'牵引力',
    isShowQuickMenu: false,
  },

  effects: {

    // *loginByPhone({ payload }, { call, put }) {
    //   //call 执行异步函数  put 发出一个action
    //   const data = yield call(loginByPhone, payload);
    //   return data;
    // },
    // *getUserInfo({ payload }, { call, put }) {
    //   //call 执行异步函数  put 发出一个action
    //   const data = yield call(getUserInfo, payload);
    //   return data;
    // },
    // *updateUserInfo({ payload }, { call, put }) {
    //   //call 执行异步函数  put 发出一个action
    //   const data = yield call(updateUserInfo, payload);
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
