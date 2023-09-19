import {
  HttpException,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { LoginUserDto, UpdateUserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CryptoUtil } from 'src/common/utils/crypto.util';

@Injectable()
export class UserService implements OnModuleInit {
  async onModuleInit() {
    if (await this.findOneByAccount('admin')) {
      return;
    }

    const admin = this.userRepo.create({
      account: 'admin',
      password: this.cryptoUtil.encrypt('admin'),
      name: '系统管理员',
      role: 'admin',
    });
    await this.userRepo.save(admin);
  }

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @Inject(CryptoUtil) private readonly cryptoUtil: CryptoUtil,
  ) {}

  async login(userDto: LoginUserDto): Promise<void> {
    const user = await this.findOneByAccount(userDto.account);
    if (!user) {
      throw new HttpException('登录失败：账号不存在', 406);
    }

    if (this.cryptoUtil.encrypt(userDto.password) !== user.password) {
      throw new HttpException('登录失败：密码错误', 406);
    }
  }

  async register(user: User): Promise<void> {
    const existingUser = await this.findOneByAccount(user.account);
    if (existingUser) {
      throw new HttpException('账号已存在', 409);
    }

    user.password = this.cryptoUtil.encrypt(user.password);
    await this.userRepo.save(user);
  }

  async remove(id: number): Promise<void> {
    const existingUser = await this.userRepo.findOneBy({ id });
    if (!existingUser) {
      throw new HttpException('删除失败：用户不存在', 404);
    }
    await this.userRepo.remove(existingUser);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existingUser = await this.userRepo.findOneBy({ id });
    if (!existingUser) {
      throw new HttpException('更新失败：用户不存在', 404);
    }

    await this.userRepo.update(id, updateUserDto);
  }

  findOneByAccount(account: string): Promise<User> {
    return this.userRepo.findOneBy({
      account,
    });
  }

  async findOneWithPosts(id: number): Promise<User> {
    return await this.userRepo.findOne({
      where: {
        id,
      },
      relations: {
        posts: true,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepo.find();
  }
}
