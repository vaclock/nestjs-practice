import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 3000
})

export interface IUser {
  username: string,
  password: string
}

export interface Book {
  /**
   * 图书id
   */
  id?: number;
  /**
   * 图书名称
   */
  name: string;
  /**
   * 图书作者
   */
  author: string;
  /**
   * 出版日期
   */
  publishDate: Date;
  /**
   * 封面图片
   */
  cover: string;
  /**
   * 简介
   */
  desc: string;
}


export async function register(data: IUser) {
  return await axiosInstance.post('/user/register', data)
}

export async function login(data: IUser) {
  return await axiosInstance.post('/user/login', data)
}

export async function list(name?: string) {
  return await axiosInstance.get(`/book/list?name=${name || ''}`)
}

export async function create(data: Book) {
  return await axiosInstance.post('/book/create', data)
}

export async function update(id: number | string, data: Book) {
  return await axiosInstance.put(`/book/${id}`, data)
}

export async function findBook(id: number | string) {
  return await axiosInstance.get(`/book/${id}`)
}

export async function deleteBook(id: number | string) {
  return await axiosInstance.delete(`/book/${id}`)
}