import React from 'react';
import styles from './index.less';


// setTitle('登录')

class InputWrap extends React.Component {
  render() {
    // // console.log('hasRight', this.props)
    const right_side = () => this.props.hasRight ? this.props.children : ''
    // this.props.onInput && (leftSide.props.onInput = this.props.onInput)
    return (
      <div className={styles.input_wrap}>
        <div className={styles.at_row__justify__between}>
          <input type={this.props.type} placeholder={this.props.placeholder} onInput={this.props.onInput}></input>
          <span className={['at-col at-col-1 at-col--auto', 'right_side']}>{right_side()}</span>
        </div>
      </div>
    )
  }
}

export default InputWrap
