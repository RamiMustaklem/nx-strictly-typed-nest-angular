import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, QueryOptions, UpdateUserDto, UserIdType, UserType, QueryDto, User } from '@typeorm';

type UsersListQueryOptions = QueryOptions<UserType, 'password' | 'projects'>;

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query() query: QueryDto<User>,
  ) {
    const { orderBy, sortBy, text, filter } = <UsersListQueryOptions>query;
    return this.usersService.paginate({ page, limit }, {
      text,
      sortBy,
      orderBy,
      filter
    });
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: UserIdType) {
    return this.usersService.findUserById(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Put(':id')
  async updateUser(@Param('id', ParseIntPipe) id: UserIdType, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: UserIdType) {
    await this.usersService.deleteUser(id);
  }

}
