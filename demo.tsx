import React from 'react';
import './index.css';
import { Button, Checkbox, Form, Input, Select } from 'antd';

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
const map = {
  connection: {
    label: '数据连接',
    field: 'connection',
    nextField: (value: string) =>
      value === 'hasDatabase' ? 'database' : 'table',
  },
  database: {
    label: '数据库',
    field: 'database',
    nextField: (value: any) => (value ? 'table' : null),
    getService: () => [
      {
        id: 123,
        name: 'db1',
      },
      {
        id: 124,
        name: 'db2',
      },
    ],
  },
  table: {
    label: '表',
    field: 'table',
    nextField: (value: any) => (value ? 'codeValue' : null),
    getService: () => [
      {
        id: 123,
        name: 'tb1',
      },
      {
        id: 124,
        name: 'tb2',
      },
    ],
  },
  codeValue: {
    label: '码值',
    field: 'codeValue',
    nextField: (value: any) => (value ? 'field1' : null),
    getService: () => [
      {
        id: 123,
        name: 'code1',
      },
      {
        id: 124,
        name: 'code2',
      },
    ],
  },
  field1: {
    label: '字段1',
    field: 'field1',
    nextField: (value: any) => (value ? 'field2' : null),
  },
  field2: {
    label: '字段2',
    field: 'field2',
    nextField: () => null,
  },
};

const App: React.FC = () => {
  const [config, setConfig] = React.useState([
    {
      id: 1,
      label: '数据连接',
      field: 'connection',
      options: [
        {
          id: 122,
          name: 'hasDatabase',
        },
        {
          id: 2,
          name: '222',
        },
      ],
      selectedValue: undefined,
      disabled: false,
    },
    {
      id: 2,
      label: '表',
      field: 'table',
      options: [],
      selectedValue: undefined,
      disabled: true,
    },
    {
      id: 3,
      label: '码值',
      field: 'codeValue',
      options: [],
      selectedValue: undefined,
      disabled: true,
    },
    {
      id: 4,
      label: '字段1',
      field: 'field1',
      options: [],
      disabled: true,
    },
    {
      id: 5,
      label: '字段2',
      field: 'field2',
      options: [],
      disabled: true,
    },
  ]);
  const onChange = (itemValue: any, index: any) => {
    const oldItem = config[index];
    console.log(oldItem);
    const newItem = { ...oldItem, selectedValue: itemValue };
    console.log(newItem);
    // setConfig([...config, newItem]);
    // console.log(config);
    const nextField = map[oldItem.field].nextField(newItem.selectedValue);
    if (nextField) {
      const list = map[nextField].getService && map[nextField].getService();
      console.log(list, 'list');
      const currItem = {
        id: Math.random(),
        label: map[nextField].label,
        field: nextField,
        options: list || [],
        selectedValue: undefined,
        disabled: itemValue ? false : true,
      };
      const currIndex = Object.keys(map).findIndex((v) => v === nextField);
      const arr: any[] = Object.keys(map)
        .slice(currIndex + 1)
        .map((v) => ({
          id: map[v].field,
          label: map[v].label,
          field: map[v].field,
          options: [],
          selectedValue: undefined,
          disabled: true,
        }));
      console.log(arr, 'arr');
      const value = [...config];
      console.log(value, index);
      console.log(currItem);
      console.log(value.splice(index + 1, value.length, currItem, ...arr));
      console.log(value, 'value');
      setConfig(value);
    }
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {config.map((field, index) => (
        <Form.Item key={field.id} label={field.label}>
          <Select
            onChange={(val: any) => onChange(val, index)}
            disabled={field.disabled}
            allowClear
          >
            {field.options.map((option: any) => (
              <Select.Option key={option.id} value={option.name}>
                {option.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      ))}
      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
