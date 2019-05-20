import React from 'react';
import './index.less';
import { Button } from 'antd';



/**
 * 模型监控
 */
class Monitoring extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
  }

  handler() {
    alert("OK");
  }

  render() {
    return <div>
      <h1 className="testStyle">模型监控</h1>
      <button onClick={this.handler}>click</button>
      <Button type="primary" icon="search">
        Search
      </Button>

    </div>;
  }

}

export default Monitoring;
