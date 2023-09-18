import { Result } from 'src/common/result.interface';
import { User } from './user.interface';
import { UserService } from './user.service';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getAll')
  async getUsers(): Promise<Result<User[]>> {
    const data = await this.userService.getUsers();
    return { code: 200, message: 'success', data };
  }

  @Get('getById/:id')
  async getUserById(@Param() params): Promise<Result<User>> {
    const data = await this.userService.getUserById(+params.id);
    return { code: 200, message: 'success', data };
  }

  @Get('getByName')
  getUsersByName(@Query() query): Promise<User[]> {
    return this.userService.getUsersByName(query.name);
  }

  @Post('add')
  async addUser(@Body() user): Promise<Result<null>> {
    await this.userService.addUser(user);
    return { code: 200, message: '创建成功' };
  }
}
