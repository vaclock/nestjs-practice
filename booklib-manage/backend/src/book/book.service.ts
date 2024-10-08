import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { DbService } from 'src/db/db.service';

function randomNum() {
  return Math.floor(Math.random() * 100000);
}
@Injectable()
export class BookService {
  @Inject(DbService)
  private dbService: DbService;

  async list(name?: string) {
    const books = await this.dbService.read();
    return name.trim()
      ? books.filter((book: UpdateBookDto) => book.name.includes(name))
      : books;
  }

  async findById(id: number) {
    const books = await this.dbService.read();
    return books.find((book: UpdateBookDto) => book.id === +id);
  }

  async create(createBookDto: CreateBookDto) {
    const books = await this.dbService.read();
    const isExist = books.find(
      (book: CreateBookDto) => book.name === createBookDto.name,
    );
    if (isExist) throw new BadRequestException('the book already exists');

    const book = {
      id: randomNum(),
      ...createBookDto,
    };
    books.push(book);
    await this.dbService.write(books);
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const books = await this.dbService.read();
    const foundBook = books.find((book: UpdateBookDto) => +book.id === +id);
    if (!foundBook) throw new BadRequestException('the book is not exists');

    foundBook.name = updateBookDto.name;
    foundBook.author = updateBookDto.author;
    foundBook.publishDate = updateBookDto.publishDate;
    foundBook.desc = updateBookDto.desc;
    foundBook.cover = updateBookDto.cover;
    await this.dbService.write(books);
    return foundBook;
  }

  async delete(id: number) {
    const books = await this.dbService.read();
    const index = books.findIndex((book: UpdateBookDto) => +book.id === +id);
    if (index === -1) {
      throw new BadRequestException('the book is not exists');
    } else {
      books.splice(index, 1);
    }
    await this.dbService.write(books);
    return books[index];
  }
}
