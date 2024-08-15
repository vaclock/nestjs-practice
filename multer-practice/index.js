const express = require('express')
const cors = require('cors')
const multer = require('multer')
const app = express()
app.use(cors())

const upload = multer({
  dest: 'uploads/'
})

// 1. 单文件上传
app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file)
  console.log(res, 'res')
  res.send('done')
}, (err, req, res) => {
  console.log(err, 'err')
})

// 2. 多文件上传
app.post('/upload-multi', upload.array('files'), (req, res) => {
  console.log(req.files)
  // res.send(JSON.stringify(req.files))
  res.send('done')
}, (err, req, res) => {
  console.log(err, 'err')
})

// 3. 多字段文件上传
app.post('/upload-multi-field', upload.fields([
  {
    name: 'file1',
    maxCount: 2
  },
  {
    name: 'file2'
  }
]), (req, res) => {
  console.log(req.files, 'res');
})

// 4. 不知道哪些字段是file
app.post('/upload-optional', upload.any(), (req, res) => {
  console.log(req.files, '')
})

app.listen(3333)