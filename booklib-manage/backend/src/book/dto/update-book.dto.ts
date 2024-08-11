import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  id?: number;
  @IsNotEmpty({ message: '图书名称不能为空' })
  name: string;
  @IsNotEmpty({ message: '图书作者不能为空' })
  author: string;
  @IsNotEmpty({ message: '图书出版时间不能为空' })
  publishDate: Date;
  @IsNotEmpty({ message: '图书描述不能为空' })
  desc: string;
}
