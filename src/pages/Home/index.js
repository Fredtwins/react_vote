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
      bannerList: [
        require('../../assets/banner1.jpg'),
        require('../../assets/banner2.jpg'),
      ],
      imgHeight: 176,
      showNote: false,
      value: '',
      reasonFont: '',
      isLoading: false,
      showListmore: true,
      provinceOption: '',
      deptOption: '',
      cityOption: '',
      teacherList: [],
      pageSize: 4,
      rankingList: [],
      commentList: [],
      showComment: false,
      commentIndex: 1,
      showModalfont: false
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
      this.setState({
        provinceOption: res.data.provinceName,
        cityOption: res.data.cityName,
        deptOption: res.data.deptName
      })
    })
    // 获取教师寄语的接口
    dispatch({
      type: 'global/MessageList',
      payload: {
        actId: 1,
        pageSize: 2,
        pageNum: 1
        // token: '80a84a8b8000016b9bcaab6680000090',
      }
    }).then(res => {
      // console.log(res);
      this.setState({
        teacherList: res.result.list
      })
    })
    this._getTpSubjectListTop10()
  }
  // 获取投票前十名
  _getTpSubjectListTop10() {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/getTpSubjectListTop10'
    }).then(res => {
      // console.log(res)
      this.setState({
        rankingList: res.result.list
      })
    })
  }

  // 关闭弹窗方法
  onClose() {
    this.setState({
      showNote: false
    })
  }

  // 点击投票开启弹窗
  ClickBtn = (id) => {
    // console.log(this.state.showModalfont)
    this.setState({
      showNote: true
    })
  }

  // 对话框输入内容事件
  handleChange(event) {
    if (event.target.value.length > 500) {
      Toast.info('请不要超过500字');
    }
    this.setState({
      value: event.target.value
    })
  }
  //编辑保存笔记弹层
  saveNote = () => {
    const { dispatch } = this.props;
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
    if (value.length >= 20) {
      dispatch({
        type: 'global/putVote',
        payload: {
          "subjectId":12,
          "actId":1,
          "evaluation":"6666",
          "userId":"1",
          "attr1":"13632421158",
          "attr2":"aaaaa",
          "userName":"小虾"
        }
      }).then(res => {
        // console.log(res)
        if (res.code === 200) {
          Toast.info(res.msg);
        } else if (res.code === -1) {
          Toast.info(res.msg);
        }
      })
      this.setState({
        showNote: false,
        value: ''
      })
    }
  }
  // 点击加载更多
  ClickMore = () => {
    console.log(this.props)
    const { dispatch } = this.props;
    const { pageSize } = this.state;
    console.log(pageSize)
    this.setState({
      pageSize: pageSize + 2
    }, () => {

      dispatch({
        type: 'global/MessageList',
        payload: {
          actId: 1,
          pageSize: pageSize,
          pageNum: 1
          // token: '80a84a8b8000016b9bcaab6680000090',
        }
      }).then(res => {
        // console.log(res);
        this.setState({
          teacherList: res.result.list
        })
      })
    })
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
  // _getDept() {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'global/getDept',
  //     payload: {
  //       token: '80a84a8b8000016b9bcaab6680000090',
  //       // token: Taro.getStorageSync('token')
  //     }
  //   }).then(res => {
  //     console.log(res)
  //     this.setState({
  //       provinceOption: res.data.provinceName,
  //     })
  //   })
  // }
  // 选择省份
  onChangecity = () => {

  }
  handleShowComment(id) {
    console.log(id)
    const { dispatch } = this.props;
    dispatch({
      type: 'global/getTpSubjectInfo',
      payload: {
        actId: 1,
        subjectId: id
      }
    }).then(res => {
      // console.log(res.result)
      // console.log('----------')
      this.setState({
        commentList: res.result
      })
    })
    this.setState({
      showComment: !this.state.showComment,
      commentIndex: id
    })
    if (this.state.showComment) {
      this.state.commentList.map((item, index) => {
        this.setState({
          [`accordion${index}`]: false,
        })
      })
    } else {
      this.state.commentList.map((item, index) => {
        this.setState({
          [`accordion${index}`]: true,
        })
      })
    }
  }
  accordionClick = (index) => {
    this.setState({
      [`accordion${index}`]: !this.state[`accordion${index}`],
    })
  }

  render() {
    const { showNote, reasonFont, showListmore, provinceOption, deptOption, cityOption, teacherList, rankingList, commentList, showComment, commentIndex } = this.state;
    return (
      <div className={styles.wrapBoxitem}>
        {/* 评选你最喜爱的一位教师 */}
        <div className={styles.contentbox}>
          {/* <h2 onClick={() => { alert(90) }}>评选你最喜爱的一位教师</h2> */}
          {/* <select name="" id="">
            <option value="11">11</option>
          </select> */}
          <div className={styles.selection}>
            <div className={styles.cascader}>
              <div className={styles.cascader_item}>
                <span className={styles.title}>省份:</span>
                <select
                  defaultValue={provinceOption}
                  onChange={this.onChangecity}
                  placeholder="请选择省份">
                  <option value={provinceOption}>
                    {provinceOption}
                  </option>
                </select>
              </div>
              <div className={styles.cascader_item}>
                <span className={styles.title}>城市:</span>
                <select
                  defaultValue={cityOption}
                  onChange={this.onChangecity}
                  placeholder="请选择城市">
                  <option value={cityOption}>
                    {cityOption}
                  </option>
                </select>
              </div>
            </div>
            <div className={styles.cascader_itemone}>
              <span className={styles.title}>校区:</span>
              <select
                defaultValue={deptOption}
                onChange={this.onChangecity}
                placeholder="请选择校区">
                <option value={deptOption}>
                  {deptOption}
                </option>
              </select>
            </div>
          </div>
          <div className={styles.imgboxBig}>
            {teacherList.map((item, index) => {
              return (
                <div className={styles.imgBox} key={index}>
                  <img src={item.picUrl ? item.picUrl : defaultAvatar} alt="" />
                  <div className={styles.teachlist}>{item.name}</div>
                  <div className={styles.teachwar}>
                    {item.attr6.substr(0, 33)}{item.attr6.length > 33 && <span>...</span>}
                  </div>
                  <div className={styles.buttonBox} onClick={this.ClickBtn.bind(this, item.id)}><span className='iconfont iconkongxin' />投票</div>
                </div>
              )
            })}
            {/* <div className={styles.imgBox}>
              <img src={box2Swiper1} alt="图片" />
              <div className={styles.teachlist}>张兰老师</div>
              <div className={styles.teachwar}>校长推荐语：最受学员喜爱的老师！最受学员喜爱的老师…</div>
              <div className={styles.buttonBox}>
                投票
              </div>
            </div> */}
          </div>
          {
            showListmore ?
              (
                <div className={styles.bottonmore} onClick={this.ClickMore}>
                  加载更多
              </div>
              ) : (
                <LoadMore loadMore={this.state.isLoading} />
              )
          }
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
                  {
                    rankingList.map((item, index) => {
                      return (
                        <div className={styles.ranking_item} key={index}>
                          <div className={styles.itemOptionBox}>
                            <div className={styles.rank}>{index + 1}</div>
                            <div className={styles.teacherBox}>
                              <div className={styles.teacher_img}>
                                {
                                  item.picUrl ? <img src={item.picUrl} alt="头像" /> : <img src={defaultAvatar} alt="头像" />
                                }

                              </div>
                              <div className={styles.name}>{item.name}</div>

                            </div>
                            {/* <div className={styles.campus}>{item.attr4}</div> */}
                            <div className={styles.commentBtn} onClick={this.handleShowComment.bind(this, item.id)}>
                              查看评价
                              <span className='iconfont rightArrow'>&#xe603;</span>
                            </div>
                          </div>

                          {commentIndex === item.id && showComment && commentList && commentList.length > 0 &&
                            <div className={styles.comment_list}>
                              {commentList.map((item, index) => {
                                return (
                                  <div className={styles.comment_item} key={index}>
                                    <div className={styles.student_avatar}>
                                      <img src={item.avatar} alt="" />
                                    </div>
                                    <div className={styles.student_name}>{item.name}</div>
                                    <div className={styles.comment_value}>{item.evaluation.substr(0, 100)}
                                      {item.evaluation.length > 100 && this.state[`accordion${index}`] &&
                                        <span className={styles.comment_more} onClick={this.accordionClick.bind(this, index)}>
                                          全文
                                        <span className='iconfont rightArrow'>&#xe603;</span>
                                        </span>
                                      }
                                      {item.evaluation.length > 100 && !this.state[`accordion${index}`] &&
                                        <span className={styles.comment_value}>
                                          {item.evaluation.substr(100, item.evaluation.length)}
                                          <div className={styles.comment_more} onClick={this.accordionClick.bind(this, index)}>收起
                                          <span className='iconfont rightArrow'>&#xe669;</span>
                                          </div>
                                        </span>
                                      }
                                    </div>
                                  </div>
                                )
                              }
                              )}
                            </div>
                          }
                        </div>
                      )
                    })
                  }
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
      </div>
    );
  }
}

export default Home;
