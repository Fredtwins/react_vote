import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Carousel, Modal, Toast, Button, Picker, List } from 'antd-mobile';
// import classnames from 'classnames';
import Swiper from 'swiper/dist/js/swiper.js';
import styles from './index.less';
// import Router from 'umi/router';
import LoadMore from '@/components/load-more';
// import Taro from '@/utils/factory.js';
import { parse } from 'qs';

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
        // require('../../assets/banner1.jpg'),
        // require('../../assets/banner2.jpg'),
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
      showModalfont: false,
      userId: '',
      provinceOptionlist: [],
      cityOptionlist: [],
      deptOptionlist: [],
      teacherMobile: null,
      id: null,
      userAvatar: null,
      userName: '',
      provinceName1: false,
      cityName: '',
      deptName: '',
      provinceName: '',
      tempteach: [],
      labelValueprovince: {},
      labelValuecity: [],
      labelValuescholl: [],
      hasToken: false,
      showbagimg: false,
      depNameteach: '',
      setTokenUrl: ''
    };
  }
  componentWillMount () {
    // 获取路由参数 更新vid
    let params = window.location.href.split('?');
    let paramsUrl = parse(params[params.length - 1]);
    console.log(paramsUrl)
    this.setState({
      setTokenUrl: paramsUrl.token
    })
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
        userId: res.data.userId,
        provinceOption: res.data.provinceName,
        cityOption: res.data.cityName,
        deptOption: res.data.deptName
      })
      console.log(this.state.provinceOption)
    })
    this.getmessageLIst()
    this._getTpSubjectListTop10()
    this.getProvince()
    this.getUserInfo()
    this.getDept()
  }
  // 获取教师寄语的接口
  getmessageLIst() {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/MessageList',
      payload: {
        actId: 1,
        pageSize: 2,
        pageNum: 1,
        attr4: this.state.deptName
        // token: '80a84a8b8000016b9bcaab6680000090',
      }
    }).then(res => {
      console.log(res);
      if (res.code === -1) {
        // 活动已结束
        Toast.info(res.msg)
      } else {
        this.setState({
          // teacherList: []
          teacherList: res.result.list
        })
      }
      if (res.result.list === []) {
        this.setState({
          showbagimg: true
        })
      } else {
        this.setState({
          showbagimg: false
        })
      }
    })
  }
  // 获取校区信息
  getDept() {
    this.props.dispatch({
      type: 'global/getDept',
      payload: {
        // token: '80a84a8b8000016b9bcaab6680000090',
        token: '811af8318000016c192c04468200002c',
        // token: Taro.getStorageSync('token')
      }
    }).then(res => {
      console.log(res)
      if (res.data.deptId !== 1) {
        this.setState({
          provinceName: res.data.provinceName,
          provinceName1: true,
          cityName: res.data.cityName.substr(0, 3),
          deptName: res.data.deptName,
          userId: res.data.userId
        }, () => {
          this.getmessageLIst()
        })
      } else {
        this.setState({
          userId: res.data.userId
        })
      }
    })
  }
  //获取用户信息
  getUserInfo() {
    // console.log(Taro.getStorageSync('token'))
    const { setTokenUrl } = this.state;
    this.props.dispatch({
      type: 'global/getUserInfo',
      payload: {
        // token: '80a84a8b8000016b9bcaab6680000090',
        token: setTokenUrl
        // token: Taro.getStorageSync('token')
      }
    }).then(res => {
      console.log(res)
      console.log('-----------')
      if (res.code === 200) {
        this.setState({
          userName: res.data.nickName ? res.data.nickName : res.data.mobile,
          userAvatar: res.data.avatar,
          hasToken: true
        })
      } else {
        this.setState({
          hasToken: false
        })
      }
    })
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
  //获取省数据
  getProvince() {
    this.props.dispatch({
      type: 'global/getProvince',
      payload: {
        // pageNum:1,
        // pageSize:300
        // token: Taro.getStorageSync('token')
      }
    }).then(res => {
      console.log(res.result.list)
      let searchListteach = res.result.list;
      for (var i in searchListteach) {
        this.state.tempteach.push(searchListteach[i].province);
        //  console.log(this.state.tempteach)
      }
      let arrmap = this.state.tempteach.map((item) => {
        // console.log(item)
        return {
          label: item,
          value: item
        }
      })
      // this.state.labelValueprovince.label = this.state.tempteach
      // this.state.labelValueprovince.value = this.state.tempteach
      // console.log(this.state.labelValueprovince)
      this.setState({
        provinceOptionlist: arrmap,
        tempteach: this.state.tempteach
      })
      console.log(this.state.provinceOptionlist)
    })
  }
  //获取市数据
  getCity = (value) => {
    console.log(value)
    this.props.dispatch({
      type: 'global/getCity',
      payload: {
        attrValue: value[0]
      }
    }).then(res => {
      console.log(res)
      let searchcity = res.result.list;
      let cityListwan = []
      for (var i in searchcity) {
        cityListwan.push(searchcity[i].city)
      }
      let arrmapcity = cityListwan.map((item) => {
        return {
          label: item,
          value: item
        }
      })
      console.log(arrmapcity)
      this.setState({
        cityOptionlist: arrmapcity,
        labelValuecity: cityListwan
      })
      console.log(cityListwan)
    })
  }
  //获取学校数据
  getSchool = (value) => {
    this.props.dispatch({
      type: 'global/getSchool',
      payload: {
        attrValue: value[0]
        // pageNum:1,
        // pageSize:300
        // token: Taro.getStorageSync('token')
      }
    }).then(res => {
      console.log(res)
      let searchschool = res.result.list;
      let schoolListwan = []
      for (var i in searchschool) {
        schoolListwan.push(searchschool[i].school)
      }
      let arrmapschool = schoolListwan.map((item) => {
        return {
          label: item,
          value: item
        }
      })
      this.setState({
        deptOptionlist: arrmapschool,
        labelValuescholl: schoolListwan
      })
    })
  }

  // 点击确认选择省份
  onOkprovience = (val) => {
    let arrtempval = val.slice(0, 1)
    console.log(arrtempval)
    this.setState({
      provinceOption: arrtempval,
      cityOption: '',
      deptOption: ''
    })
  }
  // 点击确认选择城市
  onOkcity = (val) => {
    let arrtempval = val.slice(0, 1)
    console.log(arrtempval)
    this.setState({
      cityOption: arrtempval,
      deptOption: ''
    })
  }

  // 点击确认学校
  onOkschool = (val) => {
    let arrtempval = val.slice(0, 1);
    console.log(arrtempval)
    this.setState({
      deptOption: arrtempval
    })
  }

  // 关闭弹窗方法
  onClose() {
    this.setState({
      showNote: false
    })
  }

  // 点击投票开启弹窗
  ClickBtn = (id, attr5) => {
    console.log(attr5)
    // console.log(this.state.showModalfont)
    this.setState({
      showNote: true,
      id: id,
      teacherMobile: attr5
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
          subjectId: this.state.id,
          actId: 1,
          evaluation: value,
          userId: this.state.userId,
          attr1: this.state.teacherMobile,
          attr2: this.state.userAvatar,
          userName: this.state.userName
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
    // console.log(this.props)
    const { dispatch } = this.props;
    const { pageSize } = this.state;
    // console.log(pageSize)
    console.log(this.state.deptName)
    console.log('-------')
    console.log(this.state.depNameteach)
    this.setState({
      pageSize: pageSize + 2
    }, () => {

      dispatch({
        type: 'global/MessageList',
        payload: {
          actId: 1,
          pageSize: pageSize,
          pageNum: 1,
          attr4: this.state.depNameteach
          // token: '80a84a8b8000016b9bcaab6680000090',
        }
      }).then(res => {
        // console.log(res);
        this.setState({
          isLoading: false,
          showListmore: true,
          teacherList: res.result.list
        })
      })
    })
    this.setState({
      isLoading: true,
      showListmore: false
    })
  }
  // 选择省份
  onChangeprovience = (val) => {
    // console.log(val)
    let arrmapcity = val.slice(0, 1)
    this.getCity(arrmapcity)
  }
  // 选择市区
  onChangeCity = (val) => {
    let arrmapcity = val.slice(0, 1)
    this.getSchool(arrmapcity)
  }
  // 选择校区
  onchangeSchool = (val) => {
    let arrmapschool = val.slice(0, 1);
    const { dispatch } = this.props;
    dispatch({
      type: 'global/MessageList',
      payload: {
        actId: 1,
        pageSize: 2,
        pageNum: 1,
        attr4: arrmapschool[0]
      }
    }).then(res => {
      console.log(res)
      this.setState({
        teacherList: res.result.list,
        depNameteach: arrmapschool[0]
      })
    })
  }
  handleShowComment(id) {
    // console.log(id)
    const { dispatch } = this.props;
    dispatch({
      type: 'global/getTpSubjectInfo',
      payload: {
        actId: 1,
        subjectId: id
      }
    }).then(res => {
      let searchval = res.result
      console.log(searchval)
      // console.log('----------')
      if (res.result.length > 0 && res.result) {
        this.setState({
          commentList: res.result
        })
      } else if (searchval.length === 0) {
        Toast.info('该教师暂时没有评论');
        // alert('该教师暂时没有评论')
      }
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
    const {
      showNote,
      reasonFont,
      showListmore,
      provinceOption,
      deptOption,
      cityOption,
      teacherList,
      rankingList,
      commentList,
      showComment,
      commentIndex,
      provinceOptionlist,
      cityOptionlist,
      deptOptionlist,
      provinceName1,
      tempteach,
      labelValuecity,
      labelValuescholl,
      hasToken,
      showbagimg
    } = this.state;
    return (
      <div className={styles.wrapBoxitem}>
        <div className={styles.header}>
        </div>
        {/* 评选你最喜爱的一位教师 */}
        {/* {
          hasToken &&
        } */}
        <div className={styles.contentbox}>
          <div className={styles.selection}>
            {
              hasToken &&
              <div className={styles.topteach}></div>
            }
            {
              provinceName1 || hasToken &&
              <Fragment>
                <div className={styles.cascader}>
                  <div className={styles.cascader_item}>
                    <span className={styles.title}>省份:</span>
                    <Picker
                      title="选择省份"
                      extra=""
                      data={provinceOptionlist}
                      value={tempteach}
                      disabled
                      // key={index}
                      cols={1}
                      onChange={this.onChangecity}
                      className={styles.forss}
                      okText={this.onOkprovience}
                    >
                      <List.Item arrow='horizontal'>
                        {provinceOption}
                      </List.Item>
                    </Picker>
                  </div>
                  <div className={styles.cascader_item}>
                    <span className={styles.title}>城市:</span>
                    <Picker
                      title="选择城市"
                      extra=""
                      data={cityOptionlist}
                      value={labelValuecity}
                      cols={1}
                      disabled
                      onChange={this.onChangeCity}
                      className={styles.forss}
                    // className='forss'
                    >
                      <List.Item arrow='horizontal'>
                        {cityOption}
                      </List.Item>
                    </Picker>
                  </div>
                </div>
                <div className={styles.cascader_itemone}>
                  <span className={styles.title}>校区:</span>
                  <Picker
                    title="选择城市"
                    extra=""
                    data={deptOptionlist}
                    value={labelValuescholl}
                    cols={1}
                    disabled
                    className={styles.forss}
                  // className='forss'
                  >
                    <List.Item arrow='horizontal'>
                      {deptOption}
                    </List.Item>
                  </Picker>
                </div>
              </Fragment>
            }
            {
              !provinceName1 || hasToken &&
              <Fragment>
                <div className={styles.cascader}>
                  <div className={styles.cascader_item}>
                    <span className={styles.title}>省份:</span>
                    <Picker
                      title="选择省份"
                      extra=""
                      data={provinceOptionlist}
                      value={tempteach}
                      onOk={this.onOkprovience}
                      // key={index}
                      cols={1}
                      onChange={this.onChangeprovience}
                      className={styles.forss}
                    >
                      <List.Item arrow='horizontal'>
                        {provinceOption}
                      </List.Item>
                    </Picker>
                  </div>
                  <div className={styles.cascader_item}>
                    <span className={styles.title}>城市:</span>
                    <Picker
                      title="选择城市"
                      extra=""
                      data={cityOptionlist}
                      value={labelValuecity}
                      cols={1}
                      onOk={this.onOkcity}
                      onChange={this.onChangeCity}
                      className={styles.forss}
                    // className='forss'
                    >
                      <List.Item arrow='horizontal'>
                        {cityOption}
                      </List.Item>
                    </Picker>
                  </div>
                </div>
                <div className={styles.cascader_itemone}>
                  <span className={styles.title}>校区:</span>
                  <Picker
                    title="选择城市"
                    extra=""
                    data={deptOptionlist}
                    onOk={this.onOkschool}
                    value={labelValuescholl}
                    onChange={this.onchangeSchool}
                    cols={1}
                    className={styles.forss}
                  // className='forss'
                  >
                    <List.Item arrow='horizontal'>
                      {deptOption}
                    </List.Item>
                  </Picker>
                </div>
              </Fragment>
            }

          </div>
          {
            hasToken &&
            <div className={styles.imgboxBig}>

              {
                showbagimg  ?
                (
                  <div className={styles.bagimg}></div>
                ) : (
                  <Fragment>
                    {teacherList.map((item, index) => {
                        return (

                          <div className={styles.imgBox} key={index}>
                            <img src={item.picUrl ? item.picUrl : defaultAvatar} alt="" />
                            <div className={styles.teachlist}>{item.name}</div>
                            <div className={styles.teachwar}>
                              {item.attr6.substr(0, 25)}{item.attr6.length > 25 && <span>...</span>}
                            </div>
                            <div className={styles.buttonBox} onClick={this.ClickBtn.bind(this, item.id, item.attr5)}><span className='iconfont iconkongxin' />投票</div>
                          </div>
                        )
                      })}
                    </Fragment>
                )
              }
              {
                showListmore && !showbagimg ?
                  (
                    <div className={styles.bottonmore} onClick={this.ClickMore}>
                      加载更多
                  </div>
                  ) : (
                    <LoadMore loadMore={this.state.isLoading} />
                  )
              }
              <div className={styles.rankingBottom}></div>
              <div className={styles.rankingBottomright}></div>
            </div>
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
                                      <img src={item.attr2} alt="" />
                                    </div>
                                    <div className={styles.student_name}>{item.userName}</div>
                                    <div className={styles.comment_value}>{item.evaluation.substr(0, 30)}
                                      {item.evaluation.length > 30 && !this.state[`accordion${index}`] &&
                                        <span className={styles.comment_more} onClick={this.accordionClick.bind(this, index)}>
                                          全文
                                        <span className='iconfont rightArrow'>&#xe603;</span>
                                        </span>
                                      }
                                      {item.evaluation.length > 30 && this.state[`accordion${index}`] &&
                                        <span className={styles.comment_value}>
                                          {item.evaluation.substr(30, item.evaluation.length)}
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
            <div className={styles.rankingBottom}></div>
            <div className={styles.rankingBottomright}></div>
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
