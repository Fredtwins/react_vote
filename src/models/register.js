export default {
  namespace: 'register',
  state: {
    isAgree: false,
  },
  reducers: {
    hadSawAgree(state, { payload }) {
      return {
        ...state,
        isAgree: true,
      };
    },
    changeAgreeStatus(state, { payload }) {
      return {
        ...state,
        isAgree: !state.isAgree,
      };
    },
  }
}
