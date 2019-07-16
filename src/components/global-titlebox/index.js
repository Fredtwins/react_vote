import React, { Component } from 'react'
import styles from './index.less'

export default class GlobalTitleBox extends Component {
  render () {
    return (
      <div className={styles.globalTitleBox}>
        <i className={styles.leftIcon}></i>
        <span className={styles.content}>{this.props.children}</span>
        <i className={styles.rightIcon}></i>
      </div>
    )
  }
}
