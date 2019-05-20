import React from 'react';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import "./index.less";

const { Option } = Select;

class PriceInput extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {
      number: value.number || 0,
      currency: value.currency || 'rmb',
    };
  }

  handleNumberChange = e => {
    const number = parseInt(e.target.value || 0, 10);
    if (Number.isNaN(number)) {
      return;
    }
    if (!('value' in this.props)) {
      this.setState({ number });
    }
    this.triggerChange({ number });
  };

  handleCurrencyChange = currency => {
    if (!('value' in this.props)) {
      this.setState({ currency });
    }
    this.triggerChange({ currency });
  };

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  };

  render() {
    const { size } = this.props;
    const state = this.state;
    return (
      <span>
        <Input
          type="text"
          size={size}
          // value={state.number}
          onChange={this.handleNumberChange}
          style={{ width: '13%', marginRight: '1%' }}
          placeholder="模型名称"
        />
        <Input
          type="text"
          size={size}
          // value={state.number}
          onChange={this.handleNumberChange}
          style={{ width: '13%', marginRight: '1%' }}
          placeholder="模型编码"
        />
        <Select
          // value={state.currency}
          size={size}
          style={{ width: '13%', marginRight: '1%' }}
          onChange={this.handleCurrencyChange}
          placeholder="请选择行业分类"
        >
          <Option value="rmb">RMB</Option>
          <Option value="dollar">Dollar</Option>
        </Select>
        <Select
          // value={state.currency}
          size={size}
          style={{ width: '13%' }}
          onChange={this.handleCurrencyChange}
          placeholder="请选择模型类型"
        >
          <Option value="rmb">RMB</Option>
          <Option value="dollar">Dollar</Option>
        </Select>
      </span>
    );
  }
}

class Demo extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  checkPrice = (rule, value, callback) => {
    if (value.number > 0) {
      callback();
      return;
    }
    callback('Price must greater than zero!');
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline" onSubmit={this.handleSubmit} className="queryBox">
        <Row>
          <Col span={16}>
            <Form.Item>
              {getFieldDecorator('price', {
                initialValue: { number: 0, currency: 'rmb' },
                rules: [{ validator: this.checkPrice }],
              })(<PriceInput />)}
            </Form.Item>
          </Col>
          <Col span={5}>
        <Form.Item>
          <Button type="button" className="queryButton">
            查询
          </Button>
          <Button type="default">
            重置
          </Button>
        </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedDemo = Form.create({ name: 'customized_form_controls' })(Demo);

export default WrappedDemo;
