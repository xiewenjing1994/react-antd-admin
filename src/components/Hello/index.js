import React from 'react';
import './index.less';
import http from "../../utils/httpRequest";
import { Button } from 'antd';



/**
 * 测试用
 */
class Hello extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
  }

  handler() {

    http.get('/',{});

  }

  render() {
    return <div>
      <h1 className="testStyle">Hello, React!</h1>
      <button onClick={this.handler}>click</button>
      <Button type="primary" icon="search">
        Search
      </Button>

    </div>;
  }

}

export default Hello;
