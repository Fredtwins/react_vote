/*
 * @Author: 梁发鹏
 * @Description:
 * @props:  [boolean]loadMore是否加载
 * @event:
 * @LastEditors: Please set LastEditors
 * @Date: 2019-07-19 09:36:36
 * @LastEditTime: 2019-07-19 14:32:22
 */

 import react, { Component } from 'react';
 import styles from './index.less';

 export default class LoadMore extends Component {
   render() {
     const { loadMore } = this.props;
     return (
        <div className={styles.loadMore}>
          {
            loadMore ? (
              <div className={styles.loadBox}>
                <img src={require('./loading.gif')} className={styles.loadImg}/>
                <div className={styles.loadContent}>加载更多</div>
              </div>
            ) : (
              <div>哎呀，没有内容了</div>
            )
          }
        </div>
     )
   }
 }
