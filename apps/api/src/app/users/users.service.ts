import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, Project, UpdateUserDto, User, UserIdDto } from '@typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
  ) {}

  findUsers() {
    return this.userRepository.find({ relations: ['projects'] });
  }

  findUserById(id: UserIdDto) {
    return this.userRepository.findOne({ where: { id }, relations: ['projects'] });
  }

  createUser(user: CreateUserDto) {
    const newUser = this.userRepository.create({
      ...user,
      createdAt: new Date(),
    });
    return this.userRepository.save(newUser);
  }

  updateUser(id: UserIdDto, user: UpdateUserDto) {
    return this.userRepository.update({ id }, { ...user });
  }

  deleteUser(id: UserIdDto) {
    return this.userRepository.delete({ id });
  }

}
