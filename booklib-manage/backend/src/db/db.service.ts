import { Injectable } from '@nestjs/common';
import { DbModuleOptions } from './db.module';
import { Inject } from '@nestjs/common/decorators';
import { access, readFile, writeFile } from 'fs/promises';

@Injectable()
export class DbService {
  @Inject('OPTIONS')
  private options: DbModuleOptions;

  async read() {
    const path = this.options.path;

    try {
      await access(path);
    } catch (error) {
      return [];
    }
    const str = await readFile(path, { encoding: 'utf-8' });
    if (!str) return [];
    return JSON.parse(str);
  }

  async write(data: Record<string, any>[]) {
    await writeFile(this.options.path, JSON.stringify(data, null, 2), {
      encoding: 'utf-8',
    });
  }
}
