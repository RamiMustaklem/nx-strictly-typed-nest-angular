import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, Project, UpdateUserDto, User, UserIdType } from '@typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
  ) {}

  findUsers() {
    return this.userRepository.find({ relations: ['projects'] });
  }

  findUserById(id: UserIdType) {
    return this.userRepository.findOne({ where: { id }, relations: ['projects'] });
  }

  createUser(user: CreateUserDto) {
    const newUser = this.userRepository.create({ ...user, createdAt: new Date() });
    return this.userRepository.save(newUser);
  }

  updateUser(id: UserIdType, user: UpdateUserDto) {
    return this.userRepository.update({ id }, { ...user, updatedAt: new Date() });
  }

  deleteUser(id: UserIdType) {
    return this.userRepository.delete({ id });
  }

}
