import React, { Component } from 'react';
import { connect } from 'dva';
import { Carousel } from 'antd-mobile';
import classnames from 'classnames';
import Swiper from 'swiper/dist/js/swiper.js';
import styles from './index.less';
// import Router from 'umi/router';
import GlobalTabBar from '@/components/global-tabbar';
import GlobalTitleBox from '@/components/global-titlebox';

import logo from '@/assets/logo-1.png';
import box2Swiper1 from '@/assets/box2-swiper-1.png';
import box2Swiper2 from '@/assets/box2-swiper-2.png';
import box2Swiper3 from '@/assets/box2-swiper-3.png';
import box2Swiper4 from '@/assets/box2-swiper-4.png';

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
    };
  }

  componentDidMount() {
  
    new Swiper('#box2Banner', {
      slidesPerView: 'auto',
      spaceBetween: 10,
      slidesOffsetBefore: 18,
    });

  }

  render() {
    return (
      <div className={styles.wrapBox}>
        {/* logo */}
        <div className={styles.logoBox}>
          <img src={logo} alt="logo" />
        </div>

        {/* 轮播图 */}
        <Carousel
          autoplay={false}
          infinite
          // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          // afterChange={index => console.log('slide to', index)}
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

        {/* box1 */}
        <div className={styles.box1}>
          <GlobalTitleBox>拿下教师资格证，让你从此改变</GlobalTitleBox>
        </div>


        {/* box2 */}
        <div className={styles.box2}>
          <GlobalTitleBox>拿证，还需趁早</GlobalTitleBox>

          <div id="box2Banner" className="swiper-container">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className={styles.box2Item}>
                  <img src={box2Swiper1} alt="非师范即将限考" />
                  <span>非师范即将限考</span>
                </div>
              </div>

              <div className="swiper-slide">
                <div className={styles.box2Item}>
                  <img src={box2Swiper2} alt="考试难度加大" />
                  <span>考试难度加大</span>
                </div>
              </div>

              <div className="swiper-slide">
                <div className={styles.box2Item}>
                  <img src={box2Swiper3} alt="学习时间延长" />
                  <span>学习时间延长</span>
                </div>
              </div>


              <div className="swiper-slide">
                <div className={styles.box2Item}>
                  <img src={box2Swiper4} alt="通关率越来越低" />
                  <span>通关率越来越低</span>
                </div>
              </div>

            </div>
          </div>

        </div>


        {/* box3 */}
        <div className={styles.box3}>
          <div className={styles.fromBox}>
            <div className={styles.title}>专业老师为你解答</div>
            <input className={styles.iphoneInput} placeholder="输入你的手机号码" />
            <textarea resize="none" className={styles.qaInput} placeholder="输入更多问题"></textarea>
            <div className={styles.subBtn}>
              提交 <i className={styles.subIcon}></i>
            </div>
          </div>
        </div>

        {/* box4 */}
        <div className={styles.box4}>
          <GlobalTitleBox>拿下教师资格证，让你从此改变</GlobalTitleBox>
          <ul className={styles.box4List}>
            <li className={styles.box4Item}>
              <i className={classnames(styles.box4Icon, styles.box4Icon1)}></i>
              <p className={styles.box4Title}>16年上市公司职场教育经验</p>
              <p className={styles.box4STitle}>值得信赖</p>
            </li>

            <li className={styles.box4Item}>
              <i className={classnames(styles.box4Icon, styles.box4Icon2)}></i>
              <p className={styles.box4Title}>资深教研团队</p>
              <p className={styles.box4STitle}>学习效果有保障</p>
            </li>


            <li className={styles.box4Item}>
              <i className={classnames(styles.box4Icon, styles.box4Icon3)}></i>
              <p className={styles.box4Title}>360度贴心教学服务</p>
              <p className={styles.box4STitle}>无忧学习</p>
            </li>


            <li className={styles.box4Item}>
              <i className={classnames(styles.box4Icon, styles.box4Icon4)}></i>
              <p className={styles.box4Title}>智能题库学习系统</p>
              <p className={styles.box4STitle}>考试通关有保障</p>
            </li>
          </ul>
        </div>


        <GlobalTabBar current={0} />
      </div>
    );
  }
}

export default Home;
