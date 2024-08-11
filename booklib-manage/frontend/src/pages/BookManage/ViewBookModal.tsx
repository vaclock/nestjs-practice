import { DatePicker, Form, Input, message, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { create } from "../interface";
import { Coverupload } from "./Coverupload";

interface CreateBookModalProps {
  isOpen: boolean;
  handleClose: () => void;
}
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
}

export interface CreateBook {
  name: string;
  author: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  publishDate: any;
  desc: string;
  cover: string;
}

export function CreateBookModal(props: CreateBookModalProps) {

  const [form] = useForm<CreateBook>();

  const handleOk = async function() {
    await form.validateFields();
    const values = form.getFieldsValue()
    values.publishDate = values.publishDate?.format('YYYY-MM-DD HH:mm:ss')
    console.log(values, 'values')
    try {
      const res = await create(values)
      if (res.status === 201 || res.status === 200) {
          message.success('创建成功');
          form.resetFields()
          props.handleClose();
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      message.error(error.response.data.message)
    }
  }

  return <Modal title="新增图书" open={props.isOpen} onOk={handleOk} onCancel={() => props.handleClose()} okText={'创建'}>
      <Form
          form={form}
          colon={false}
          {...layout}
      >
          <Form.Item
              label="图书名称"
              name="name"
              rules={[
                  { required: true, message: '请输入图书名称!' },
              ]}
          >
          </Form.Item>
          <Form.Item
              label="作者"
              name="author"
              rules={[
                  { required: true, message: '请输入图书作者!' },
              ]}
          >
              <Input />
          </Form.Item>
          <Form.Item
              label="描述"
              name="desc"
              rules={[
                  { required: true, message: '请输入图书描述!' },
              ]}
          >
              <TextArea/>
          </Form.Item>
          <Form.Item
              label="出版时间"
              name="publishDate"
          >
              <DatePicker format="YYYY-MM-DD HH:mm:ss"></DatePicker>
          </Form.Item>
          <Form.Item
              label="封面"
              name="cover"
              rules={[
                  { required: true, message: '请上传图书封面!' },
              ]}
          >
              {/* Form.Item 会在渲染 children 的时候传入 value 和 onChange */}
              <Coverupload></Coverupload>
          </Form.Item>
      </Form>
  </Modal>
}
