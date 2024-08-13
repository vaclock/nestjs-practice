import { Form, Input, message, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { Coverupload } from "./Coverupload";
import { findBook, update } from "../interface";
import { useEffect } from "react";

interface UpdateBookModalProps {
  id: string | number;
  isOpen: boolean;
  handleClose: () => void;
}
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
}

export interface UpdateBook {
  name: string;
  author: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  publishDate: any;
  desc: string;
  cover: string;
}

export function UpdateBookModal(props: UpdateBookModalProps) {
	const id = props.id;

  const [form] = useForm<UpdateBook>();
  async function getBookInfo(id: string | number) {
		if (!id) return;
    try {
			const res = await findBook(id)
			if (res.status === 201 || res.status === 200) {
				form.setFieldsValue({
					...res.data
				})
			}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        message.error(error.response.data.message)
    }

  }
  useEffect(() => {
    getBookInfo(id)
  }, [id])
  const handleOk = async function() {
    await form.validateFields();
    const values = form.getFieldsValue()
    // values.publishDate = values.publishDate?.format('YYYY-MM-DD HH:mm:ss')
    try {
      const res = await update(props.id, values)
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
              <Input />
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
