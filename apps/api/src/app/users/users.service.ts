import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { CreateUserDto, Project, UpdateUserDto, User, UserIdType, UserType } from '@typeorm';
import { QueryOptions } from '@utils';

type UsersListQueryOptions = QueryOptions<UserType, 'password' | 'projects'>;

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
  ) {}

  async paginate(
    options: IPaginationOptions,
    filterOptions: Omit<UsersListQueryOptions, 'page' | 'limit'>
  ): Promise<Pagination<User>> {
    const { text, filter, sortBy, orderBy } = filterOptions;
    return paginate<User>(this.userRepository, options, {
      ...(sortBy && orderBy && { order: { [sortBy]: orderBy } }),
      ...(text && { where: { name: Like(`%${text}%`) } }),
      ...(filter && { where: { ...filter } })
    });
  }

  findUsers() {
    return this.userRepository.find({ relations: ['projects'] });
  }

  findUserById(id: UserIdType) {
    return this.userRepository.findOne({ where: { id }, relations: ['projects'] });
  }

  createUser(user: CreateUserDto) {
    const newUser = this.userRepository.create({ ...user, /*createdAt: new Date()*/ });
    return this.userRepository.save(newUser);
  }

  async updateUser(id: UserIdType, user: UpdateUserDto) {
    await this.userRepository.update({ id }, { ...user, /*updatedAt: new Date()*/ });
    return await this.userRepository.findOne({ where: { id } });
  }

  deleteUser(id: UserIdType) {
    return this.userRepository.delete({ id });
  }

}
