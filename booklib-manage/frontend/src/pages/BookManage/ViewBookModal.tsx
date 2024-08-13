import { Form, Input, message, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { findBook } from "../interface";
import { useEffect, useState } from "react";

interface ViewBookModalProps {
  id: string | number;
  isOpen: boolean;
  handleClose: () => void;
}
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
}

export interface ViewBook {
  name: string;
  author: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  publishDate: any;
  desc: string;
  cover: string;
}

export function ViewBookModal(props: ViewBookModalProps) {
	const id = props.id;

  const [form] = useForm<ViewBook>();
	const [img, setImg] = useState('');
  async function getBookInfo(id: string | number) {
		if (!id) return;
    try {
			const res = await findBook(id)
			if (res.status === 201 || res.status === 200) {
				form.setFieldsValue({
					...res.data
				})
				setImg(res.data.cover)
			}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        message.error(error.response.data.message)
    }

  }
  useEffect(() => {
    getBookInfo(id)
  }, [id])

  return <Modal title="新增图书" open={props.isOpen} onOk={props.handleClose} onCancel={() => props.handleClose()}>
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
              <Input disabled/>
          </Form.Item>
          <Form.Item
              label="作者"
              name="author"
              rules={[
                  { required: true, message: '请输入图书作者!' },
              ]}
          >
              <Input disabled />
          </Form.Item>
          <Form.Item
              label="描述"
              name="desc"
              rules={[
                  { required: true, message: '请输入图书描述!' },
              ]}
          >
              <TextArea disabled />
          </Form.Item>
          <Form.Item
              label="封面"
              name="cover"
              rules={[
                  { required: true, message: '请上传图书封面!' },
              ]}
          >
						{/* Form.Item 会在渲染 children 的时候传入 value 和 onChange */}
						{/* <Coverupload></Coverupload> */}
						<img style={{width: '300px', height: '350px'}} src={`http://localhost:3000/${img}`} alt="cover" />
          </Form.Item>
      </Form>
  </Modal>
}
