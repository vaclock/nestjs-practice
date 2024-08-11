import {Button, Form, Input, message} from 'antd';
import './index.css'
import { IUser, login } from '../interface';


const layout2 = {
  labelCol: {span: 0 },
  wrapperCol: { span: 24 }
};

export default function Login() {
  const onFinish = async (values: IUser) => {
    try {
      const res = await login(values);
      if (res.status === 201 || res.status === 200) {
        message.success('登录成功');
        setTimeout(() => {
          window.location.href = '/';
        }, 1000)
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      message.error(error.response.data.message);
    }
  };
  return <div className="login-container">
    <h1>图书管理系统</h1>
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      colon={false}
      autoComplete="off"
      onFinish={onFinish}
    >
      <Form.Item
        label="用户名"
        name="username"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
      >
        <Input.Password></Input.Password>
      </Form.Item>
      <Form.Item
        {...layout2}
      >
        <div>
          <a href="/register" className="links">暂无账号? 去注册</a>
        </div>
      </Form.Item>

      <Form.Item
        {...layout2}
      >
        <Button type="primary" htmlType='submit' className="btn">登录</Button>
      </Form.Item>
    </Form>
  </div>
}