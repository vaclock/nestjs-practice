import { Button, Card, Form, Input, message } from "antd";
import "./index.css";
import { useEffect, useState } from "react";
import { Book, deleteBook, list } from "../interface";
import { CreateBookModal } from "./CreateBookModal";
import { UpdateBookModal } from "./UpdateBookModal";
import { ViewBookModal } from "./ViewBookModal";


export default function BookManage() {
  const [booklist, setBooklist] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [updateIsOpen, setUpdateIsOpen] = useState(false)
  const [viewIsOpen, setViewIsOpen] = useState(false)
  const [currentId, setCurrentId] = useState<string | number>('')
  const [name, setName] = useState('')
  async function fetchBookList() {
    try {
      const res = await list(name);
      if (res.status === 200 || res.status === 201) {
        console.log(res.data)
        setBooklist(res.data)
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      message.error(error.response.data.message)
    }
  }

  useEffect(() => {
    fetchBookList();
  }, [name])


  return <div className="book-manage">
    <CreateBookModal
      isOpen={isOpen}
      handleClose={() => {
        setIsOpen(false)
        setName('')
      }}
    ></CreateBookModal>
    <UpdateBookModal
      id={currentId}
      isOpen={updateIsOpen}
      handleClose={() => {
        setUpdateIsOpen(false)
        setName(' ')
      }}
    ></UpdateBookModal>
    <ViewBookModal
      id={currentId}
      isOpen={viewIsOpen}
      handleClose={() => {
        setViewIsOpen(false)
      }}
    ></ViewBookModal>
    <h1>图书管理系统</h1>
    <div className="content">
      <div className="book-search">
        <Form
          layout="inline"
          colon={false}
          onFinish={(values) => {
            setName(values.name)
          }}
        >
          <Form.Item
            label="图书名称"
            name="name"
          >
            <Input></Input>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
            >搜索图书</Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{background: 'green', marginLeft: '10px'}}
              onClick={() => {
                setIsOpen(true)
              }}
            >添加图书</Button>
          </Form.Item>
        </Form>
      </div>
      <div className="book-list">
        {booklist.map((item: Book) => {
            return <Card
              key={item.id}
              className="card"
              style={{ width: 230 }}
              cover={<img src={`http://localhost:3000/${item.cover}`} style={{height: '250px'}}/>}
              hoverable
            >
               <h2>{item.name}</h2>
                <div>{item.author}</div>
                <div className='links'>
                    <a href="#" onClick={() => {
                      if (!item?.id) {
                        message.error('当前图书无id')
                        return
                      }
                      setCurrentId(item.id);
                      setViewIsOpen(true)
                    }}>详情</a>
                    <a href="#" onClick={() => {
                      if (!item?.id) {
                        message.error('当前图书无id')
                        return
                      }
                      setCurrentId(item.id);
                      setUpdateIsOpen(true)
                    }}>编辑</a>
                    <a href="#" onClick={async () => {
                      if (!item?.id) {
                        message.error('当前图书无id')
                        return
                      }
                      try {
                        const res = await deleteBook(item?.id)
                        if (res.status === 200 || res.status === 201) {
                          message.success('删除成功')
                          setName(' ')
                        }
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      } catch (error: any) {
                        message.error(error.response.data.message)
                      }

                    }}>删除</a>
                </div>
            </Card>
          })
        }
      </div>
    </div>
  </div>;
}