import {Form, Input} from 'antd';

export default function Register() {
  const onFinish = (values: unknown) => {
    console.log('Success:', values);
  };
  return <>
    <h1>图书管理系统</h1>
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 300 }}
      onFinish={onFinish}
    >
      <Form.Item
        label="用户名"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="密码"
      >

      </Form.Item>
    </Form>
  </>
}