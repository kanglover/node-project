import { LoginUserDto } from './../user/dto/user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CryptoUtil } from 'src/common/utils/crypto.util';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(CryptoUtil) private readonly cryptoUtil: CryptoUtil,
  ) {}

  async createToken(userDto: LoginUserDto) {
    return this.jwtService.sign(userDto);
  }

  async validateUser(userDto: LoginUserDto): Promise<User> {
    const user = await this.userService.findOneByAccount(userDto.account);
    if (user && user.password === this.cryptoUtil.encrypt(userDto.password)) {
      return user;
    }
    return null;
  }
}
