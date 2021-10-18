import { Injectable } from '@nestjs/common';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { AuthorRepository } from './author.repository';
import { GetAuthorArgs } from './dto/get-author.args';

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  create(createAuthorInput: CreateAuthorInput) {
    return 'This action adds a new author';
  }

  async findAll() {
    return await this.authorRepository.find();
  }

  async find(args: GetAuthorArgs) {
    return await this.authorRepository.find(args);
  }

  async findOne(id: number) {
    return await this.authorRepository.findOne({ id: id });
  }

  update(id: number, updateAuthorInput: UpdateAuthorInput) {
    return `This action updates a #${id} author`;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}
