import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/user/dto/user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: LoginUserDto) {
    const user = await this.authService.validateUser(payload);
    console.log('user', user);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
