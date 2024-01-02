import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, Post, UpdateUserDto, User, UserIdDto } from '@typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  findUsers() {
    return this.userRepository.find({ relations: ['posts'] });
  }

  findUserById(id: UserIdDto) {
    return this.userRepository.findOne({ where: { id }, relations: ['posts'] });
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
