import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from './my-book-storge';
import * as path from 'node:path';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'uploads',
      storage: storage,
      limits: {
        fileSize: 1024 * 1024, // 1M
      },
      fileFilter: (req, file, cb) => {
        const extname = path.extname(file.originalname);
        const supportFiles = ['.jpg', '.png', '.gif'];
        if (supportFiles.includes(extname)) {
          cb(null, true);
        } else {
          cb(
            new BadRequestException(
              `只能上传后缀为${supportFiles.join('、')}图片`,
            ),
            false,
          );
        }
      },
    }),
  )
  fileUpload(@UploadedFile() file: Express.Multer.File) {
    return file.path;
  }

  @Get('list')
  list(@Query('name') name?: string) {
    return this.bookService.list(name);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.bookService.findById(id);
  }

  @Post('create')
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.bookService.delete(id);
  }
}
