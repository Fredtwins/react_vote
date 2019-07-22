import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import Router from 'umi/router';
import GlobalTabBar from '@/components/global-tabbar';

// import defaultAvatar from '@/assets/default-avatar.png';


@connect(state => {
  return {
    globalData: state.global,
  };
})
class UserCenter extends Component {
  constructor() {
    super(...arguments);

    this.state = {
      isLogin: false,
    };
  }

  goToLogin = () => {
    Router.push('./Login');
  }

  goToRegister = () => {
    Router.push('./Register');
  }

  componentDidMount() {

  }

  render() {
    const { isLogin } = this.state;
    return (
      <div className={styles.wrapBox}>
        <div className={styles.userInfoBox}>
          <div className={styles.avatarBox}>
            {/* <img className={!isLogin ? styles.gray : null} src={defaultAvatar} alt="" /> */}
          </div>

          <div className={styles.infoBox}>
            {
              !isLogin
                ?
                <div className={styles.action}>
                  <span onClick={this.goToLogin} className={styles.loginBtn}>登录</span>
                  <span onClick={this.goToRegister} className={styles.registerBtn}>注册</span>
                </div>
                :
                <div className={styles.userName}>赵日天</div>
            }


          </div>
        </div>

        <GlobalTabBar current={3} />
      </div>
    );
  }
}

export default UserCenter;
