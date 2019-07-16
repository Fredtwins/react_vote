import React from 'react';
import '../utils/flexible.js';
import { connect } from 'dva';
import DocumentTitle from 'react-document-title';
import '@/assets/less/theme.less';
import 'swiper/dist/css/swiper.min.css';

@connect(state => {
  return {
    title: state.global.title,
  };
})
class BasicLayout extends React.Component {
  render() {
    return (
      <DocumentTitle title={this.props.title}>
        {/* <div> */}
        {this.props.children}
        {/* </div> */}
      </DocumentTitle>
    );
  }
}

export default BasicLayout;
