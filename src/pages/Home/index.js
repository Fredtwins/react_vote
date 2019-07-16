import React, { Component } from 'react';
import { connect } from 'dva';
import { Carousel } from 'antd-mobile';
import classnames from 'classnames';
import Swiper from 'swiper/dist/js/swiper.js';
import styles from './index.less';
// import Router from 'umi/router';
// import GlobalTabBar from '@/components/global-tabbar';
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

        {/* <GlobalTabBar current={0} /> */}
        {/* 评选你最喜爱的一位教师 */}
        <div className={styles.contentbox}>
            <h2>评选你最喜爱的一位教师</h2>
            <select name="" id="">
              <option value="11">11</option>
            </select>
        </div>
      </div>
    );
  }
}

export default Home;
