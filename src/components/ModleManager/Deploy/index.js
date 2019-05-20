import React from 'react';
import './index.less';

import { Col, Row, Upload, Button, Icon, Table } from 'antd';
// 新建模型引入
import CollectionsPage from './addDialog';
// 导入模型引入
import { openNotification, props as importFiles } from './importFiles';
// 查询功能引入
import WrappedDemo from "./queryModle";
// 模型详情引入
import { columns, data } from './detailContent';
import Demo from "./Information/index";

/**
 * 模型部署
 */

class Deploy extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
  }

  handler() {
    alert("OK");
  }

  render() {
    return <div className="ant-advanced-search-form">
      <Row>
        <Col span={2} style={{ marginLeft: "20px" }}>
          {/*新建模型*/}
          <CollectionsPage />
        </Col>
        <Col>
          {/*导入模型*/}
          <Upload {...importFiles} span={3}>
            <Button type="default" size="large" onClick={openNotification}>
              <Icon type="download" /> 导入模型
            </Button>
          </Upload>
        </Col>
      </Row>
      <Row>
      {/*查询模型*/}
      <WrappedDemo></WrappedDemo>
      </Row>
      {/*模型详情*/}
      <Row>
        <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />
      </Row>
    {/*  测试*/}
    {/*<Demo></Demo>*/}
    </div>;
  }

}

export default Deploy;
