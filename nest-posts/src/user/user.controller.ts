import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  Get,
  Inject,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { LoginUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { Roles } from 'src/common/decorators/role.decorator';
import { RolesGuard } from 'src/common/guards/role.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(UserService) private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() userDto: LoginUserDto) {
    await this.userService.login(userDto);
    const accessToken = await this.authService.createToken(userDto);
    return { code: 200, message: '登录成功', data: accessToken };
  }

  @Post('register')
  async register(@Body() user: User) {
    await this.userService.register(user);
    return { code: 200, message: '注册成功' };
  }

  /**
   * 在调用有 @UseGuards(AuthGuard()) 装饰的路由时，会检查当前请求头中是否包含 Authorization: Bearer xxx 授权令牌
   */
  @Delete(':id')
  @Roles('admin')
  @UseGuards(AuthGuard(), RolesGuard)
  async remove(@Param('id') id: number) {
    await this.userService.remove(id);
    return { code: 200, message: '删除成功' };
  }

  @Put(':id')
  @Roles('admin')
  @UseGuards(AuthGuard(), RolesGuard)
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Get(':id')
  async findOne(@Param() id: number) {
    const data = await this.userService.findOneWithPosts(id);
    return { code: 200, message: '查询用户成功', data };
  }

  @Get()
  @Roles('admin')
  @UseGuards(AuthGuard(), RolesGuard)
  async findAll() {
    const data = await this.userService.findAll();
    return { code: 200, message: '查询所有用户成功', data };
  }
}
