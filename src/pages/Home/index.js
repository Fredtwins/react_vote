import React, { Component } from 'react';
import { connect } from 'dva';
import { Carousel, Modal, Toast, Button } from 'antd-mobile';
// import classnames from 'classnames';
import Swiper from 'swiper/dist/js/swiper.js';
import styles from './index.less';
// import Router from 'umi/router';
import box2Swiper1 from '@/assets/box2-swiper-1.png';
import LoadMore from '@/components/load-more';

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
      reasonFont: '',
      isLoading: false,
      showListmore: true
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/getListcity',
      payload: {
        token: '80a84a8b8000016b9bcaab6680000090'
      }
    }).then(res => {
      // console.log(res)
    })
    // 获取教师寄语的接口
    dispatch({
      type: 'global/MessageList',
      payload: {
        actid: 1,
        pageSize: 1,
        pageNum: 1
        // token: '80a84a8b8000016b9bcaab6680000090',
      }
    }).then(res => {
      console.log(res)
    })
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
  // 点击加载更多
  ClickMore = () => {
    this.setState({
      isLoading: true,
      showListmore: false
    })
    setTimeout(() => {
      this.setState({
        isLoading: false,
        showListmore: true
      })
    }, 3000)
  }

  render() {
    const { showNote, reasonFont, showListmore } = this.state;
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
            <div className={styles.teachlist}>张兰老师</div>
            <div className={styles.teachwar}>校长推荐语：最受学员喜爱的老师！最受学员喜爱的老师…</div>
            <div className={styles.buttonBox} onClick={this.ClickBtn}>
              投票
            </div>
          </div>
          <div className={styles.imgBox}>
            <img src={box2Swiper1} alt="图片"/>
            <div className={styles.teachlist}>张兰老师</div>
            <div className={styles.teachwar}>校长推荐语：最受学员喜爱的老师！最受学员喜爱的老师…</div>
            <div className={styles.buttonBox}>
              投票
            </div>
          </div>
          {
            showListmore ?
            (
              <div className={styles.bottonmore} onClick={this.ClickMore}>
                加载更多
              </div>
            ) : (
              <LoadMore loadMore={this.state.isLoading}/>
            )
          }
        </div>
        {/* top10教师排行榜 */}
        <div className={styles.ranking}>
          {/* 头部 */}
          <div className={styles.rankingTop}></div>
          <div className={styles.rankingBox}>
            <div className={styles.contnetBox}>
              <ul className={styles.titleBox}>
                <li>排名</li>
                <li>老师</li>
                <li>学员评价</li>
              </ul>
              {/* 列表 */}
              <div className={styles.ranking_list}>

              </div>
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
