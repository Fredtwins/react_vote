import React, { Component } from 'react';
import { connect } from 'dva';
import { Carousel, Modal, Toast, Button } from 'antd-mobile';
// import classnames from 'classnames';
import Swiper from 'swiper/dist/js/swiper.js';
import styles from './index.less';
// import Router from 'umi/router';
import box2Swiper1 from '@/assets/box2-swiper-1.png';

@connect(state => {
  return {
    globalData: state.global,
    homePage: state.homePage,
  };
})

class Home extends Component {
  constructor() {
    super(...arguments);

    this.state = {
      bannerList:[
        require('../../assets/banner1.jpg'),
        require('../../assets/banner2.jpg'),
      ],
      imgHeight: 176,
      showNote: false,
      value: '',
      reasonFont: ''
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
  }

  // 关闭弹窗方法
  onClose () {
    this.setState({
      showNote: false
    })
  }

  // 点击投票开启弹窗
  ClickBtn = () => {
    this.setState({
      showNote: true
    })
  }

  // 对话框输入内容事件
  handleChange (event) {
    if (event.target.value.length > 500) {
      Toast.info('请不要超过500字');
    }
    this.setState({
      value: event.target.value
    })
  }
  //编辑保存笔记弹层
  saveNote = () => {
    const { value } = this.state;
    if (value.length === 0) {
      this.setState({
        reasonFont: '亲，请填写支持老师的理由'
      })
    } else if (value.length < 20) {
      this.setState({
        reasonFont: '亲，最少输入20个中文字'
      })
    } else {
      this.setState({
        reasonFont: ''
      })
    }
    if (value.length > 20) {
      this.setState({
        showNote: false
      })
    }
  }

  render() {
    const { showNote, reasonFont } = this.state;
    return (
      <div className={styles.wrapBox}>
        {/* 评选你最喜爱的一位教师 */}
        <div className={styles.contentbox}>
          <h2 onClick={() => { alert(90) }}>评选你最喜爱的一位教师</h2>
          {/* <select name="" id="">
            <option value="11">11</option>
          </select> */}
          <div className={styles.imgBox}>
              <img src={box2Swiper1} alt="图片"/>
              <div>校长推荐语:</div>
              <br/>
              <div>最受学员喜爱的师!</div>
              <div>张兰老师</div>
              <div className={styles.buttonBox} onClick={this.ClickBtn}>
                投票
              </div>
            </div>
            <div className={styles.imgBox}>
              <img src={box2Swiper1} alt="图片"/>
              <div>校长推荐语:</div>
              <br/>
              <div>最受学员喜爱的师!</div>
              <div>张兰老师</div>
              <div className={styles.buttonBox}>
                投票
              </div>
            </div>
            <div className={styles.imgBox}>
              <img src={box2Swiper1} alt="图片"/>
              <div>校长推荐语:</div>
              <br/>
              <div>最受学员喜爱的师!</div>
              <div>张兰老师</div>
              <div className={styles.buttonBox}>
                投票
              </div>
          </div>
        </div>
        <Modal
          visible={showNote}
          onClose={this.onClose.bind(this)}
          className={styles.note_modal}
          animationType="slide-up"
          transparent
          maskClosable={true}
        >
          <div>
            <div className={styles.titlemodal}>投票理由</div>
            <div className={styles.titlemodalfirst}>
              亲爱的学员：
            </div>
            <div className={styles.titlecontentmodal}>
            请写下支持老师的理由或关于老师的暖心故事，不然你最爱的老师将无法得到你宝贵的一票。（20-500字）
            </div>
            <textarea
              value={this.state.value}
              onChange={this.handleChange.bind(this)}
              maxLength={500}
              className={styles.note_textarea}
              placeholder="请输入内容..."
            />
            <div className={styles.reason}>
              <span className={styles.reasonfont}>{reasonFont}</span>
              <span className={styles.note_number}>{this.state.value.length}/500</span>
            </div>
            <Button onClick={() => this.saveNote()} className="save">
              提交
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Home;
