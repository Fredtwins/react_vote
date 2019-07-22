import InputWrap from '@/components/input_wrap';
import React from 'react';
import styles from './index.less';
import { Button } from 'antd-mobile';
import classnames from 'classnames';
// import logo from '@/assets/logo-1.png';
// import connect from 'dva';

// @connect(state => {
//   return {
//     globalData: state.global,
//   };
// })

class Loginpage extends React.Component {
  doLogin () {

  }
  goPhoneLogin () {

  }
  toFindPass () {

  }
  addInput () {

  }
  render () {
    return (
      <div className={styles.login}>
        <div className={styles.title}>
          <span className={classnames([styles.icon])} />
          &nbsp;
          <span className={styles.titleName}>
            {/* <img src={logo} alt='logo'/> */}
          </span>
        </div>
        {/* <FormRule formData={this.state.formData} rule={this.state.rule} ref="validate"> */}
        <InputWrap
          placeholder="手机号/邮箱/恒企账号"
          onInput={value => this.addInput.apply(this, [value, 'mobileNo'])}
        />
        <InputWrap
          placeholder="密码"
          type="password"
          onInput={value => this.addInput.apply(this, [value, 'passWord'])}
        />
        {/* </FormRule> */}
        <Button
          // loading={this.state.loading}
          type="primary"
          className={[styles.button_sure, styles.actived]}
          onClick={this.doLogin.bind(this)}
        >
          登录
        </Button>
        {/* <div
          className={[styles.button_register]}
          onClick={this.toRegister.bind(this)}
        >
          注册
        </div> */}
        <div className={styles.linkPanel}>
          <div className={styles.button_forget_password}>
            <p onClick={this.goPhoneLogin.bind(this)}>注册</p>
          </div>
          <div className={styles.button_forget_password}>
            <p onClick={this.toFindPass.bind(this)}>忘记密码？</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Loginpage;
