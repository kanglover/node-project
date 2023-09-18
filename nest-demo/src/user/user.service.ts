import { HttpException, Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  getUsers() {
    return this.userRepository.find();
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    console.log(user);
    if (!user) {
      throw new HttpException('用户不存在', 404);
    }
    return user;
  }

  getUsersByName(name: string) {
    return this.userRepository.find({
      where: {
        name: Like(`%${name}%`),
      },
    });
  }

  addUser(user: User) {
    console.log(user);
    return this.userRepository.save(user);
  }
}
