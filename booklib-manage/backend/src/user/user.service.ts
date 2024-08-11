import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Inject } from '@nestjs/common/decorators';
import { DbService } from 'src/db/db.service';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class UserService {
  @Inject(DbService)
  private dbService: DbService;

  async register(user: RegisterUserDto) {
    const users = await this.dbService.read();
    const foundUser = users.find(
      (u: RegisterUserDto) => u.username === user.username,
    );
    if (foundUser) {
      throw new BadRequestException('username already exists');
    }
    users.push(user);
    await this.dbService.write(users);
    return user;
  }
  login(user: LoginUserDto) {
    console.log(user);
    return 'done';
  }
}
