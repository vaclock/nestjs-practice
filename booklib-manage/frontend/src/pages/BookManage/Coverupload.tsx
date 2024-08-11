import { InboxOutlined } from "@ant-design/icons";
import { message } from "antd";
import Dragger, {DraggerProps} from "antd/es/upload/Dragger";

interface CoveruploadProps {
  value?: string;
  onChange?: (value: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let onChange: (value: any) => void;

const draggerProps: DraggerProps = {
  name: 'file',
  action: 'http://localhost:3000/book/upload',
  method: 'post',
  onChange: (info) => {
    if (info.file.status === 'done') {
      onChange(info.file.response);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} upload error`);
    }
  },
}

const dragger =  <Dragger {...draggerProps}>
  <p className="ant-upload-drag-icon">
    <InboxOutlined />
  </p>
  <p className="ant-upload-text">点击或拖拽文件到这个区域来上传</p>
</Dragger>

export function Coverupload(props: CoveruploadProps) {

  if (props.onChange) onChange = props.onChange
  return props.value ?
    <div>
      <img src={`http://localhost:3000/${props.value}`} alt="cover" />
      {dragger}
    </div>
    : dragger;
}