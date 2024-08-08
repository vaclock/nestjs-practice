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
  list() {
    return this.bookService.list();
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
  update(@Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(updateBookDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.bookService.delete(id);
  }
}
