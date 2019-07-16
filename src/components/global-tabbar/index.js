import React, { Component } from 'react'
import { TabBar } from 'antd-mobile';
import router from 'umi/router'
import './index.less'

export default class GlobalTabBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0
    }
  }

  componentDidMount () {
    if (this.props.current) {
      this.setState({
        current: this.props.current
      })
    }
  }

  render () {
    return (
      <div className="global-tabbar-box">
        <TabBar
          tabBarPosition="bottom"
          unselectedTintColor="#AAAAAA"
          tintColor="#333"
          current={this.props.current}
        >
          <TabBar.Item
            title="首页"
            key="home"
            icon={<i className='tabicon icon-1' />
            }
            selectedIcon={<i className='tabicon icon-1s'/>
            }
            onPress={() => {
              this.setState({
                current: 0,
              });
              router.push('/Home')
            }}
            selected={this.state.current === 0}
          >
          </TabBar.Item>

          <TabBar.Item
            title="课程"
            key="kechen"
            icon={<i className='tabicon icon-2' /> 
            }
            selectedIcon={<i className='tabicon icon-2s' /> }
            onPress={() => {
              this.setState({
                current: 1,
              });
              router.push('/Course')
            }}
            selected={this.state.current === 1}
            data-seed="logId"
          >
          </TabBar.Item>

          <TabBar.Item
            title="学习中心"
            key="xuexi"
            icon={<i className='tabicon icon-3' />
            }
            selectedIcon={<i className='tabicon icon-3s' />
            }
            onPress={() => {
              this.setState({
                current: 2,
              });
              router.push('/Downloadpage')
            }}
            selected={this.state.current === 2}
          >
          </TabBar.Item>

          <TabBar.Item
            title="我的"
            key="wode"
            icon={<i className='tabicon icon-4' />
            }
            selectedIcon={<i className='tabicon icon-4s' />
            }
            onPress={() => {
              this.setState({
                current: 3,
              });
              router.push('/UserCenter')
            }}
            selected={this.state.current === 3}
          >
          </TabBar.Item>
        </TabBar>
      </div>
    )
  }
}
