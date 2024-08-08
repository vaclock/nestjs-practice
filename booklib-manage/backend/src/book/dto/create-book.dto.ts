import { IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty({ message: '图书名称不能为空' })
  name: string;

  @IsNotEmpty({ message: '图书作者不能为空' })
  author: string;

  @IsNotEmpty({ message: '图书出版日期不能为空' })
  publishDate: Date;

  @IsNotEmpty({ message: '图书描述不能为空' })
  desc: string;

  @IsNotEmpty({ message: '图书封面不能为空' })
  cover: string;
}
