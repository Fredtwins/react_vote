import React, { Component } from 'react';
import { connect } from 'dva';
import { Carousel } from 'antd-mobile';
// import classnames from 'classnames';
import Swiper from 'swiper/dist/js/swiper.js';
import styles from './index.less';
// import Router from 'umi/router';
// import GlobalTabBar from '@/components/global-tabbar';
// import GlobalTitleBox from '@/components/global-titlebox';

// import logo from '@/assets/logo-1.png';
// import box2Swiper1 from '@/assets/box2-swiper-1.png';
// import box2Swiper2 from '@/assets/box2-swiper-2.png';
// import box2Swiper3 from '@/assets/box2-swiper-3.png';
// import box2Swiper4 from '@/assets/box2-swiper-4.png';

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
      value: ''
    };
  }

  componentDidMount() {

    new Swiper('#box2Banner', {
      slidesPerView: 'auto',
      spaceBetween: 10,
      slidesOffsetBefore: 18,
    });

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
    this.setState({
      showNote: false
    })
  }

  render() {
    const { showNote } = this.state;
    return (
      <div className={styles.wrapBox}>

        {/* 轮播图 */}
        <Carousel
          autoplay={false}
          infinite
        >
          {this.state.bannerList.map((item, index) => (
            <a
              key={index}
              href="./Downloadpage"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={item}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
        {/* 评选你最喜爱的一位教师 */}
        <div className={styles.contentbox}>
          <h2 onClick={() => { alert(90) }}>评选你最喜爱的一位教师</h2>
          <select name="" id="">
            <option value="11">11</option>
          </select>
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
            <span>
              亲爱的学员：
            </span>
            <span>
            请写下支持老师的理由或关于老师的暖心故事，不然你最爱的老师将无法得到你宝贵的一票。（20-500字）
            </span>
            <textarea
              value={this.state.value}
              onChange={this.handleChange.bind(this)}
              maxLength={500}
              className={styles.note_textarea}
              placeholder="请输入内容..."
            />
            <span className={styles.note_number}>{this.state.value.length}/500</span>
            <Button onClick={() => this.saveNote()} className="save">
              确定
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Home;
