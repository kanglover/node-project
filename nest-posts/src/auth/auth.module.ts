import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';
import { UserModule } from 'src/user/user.module';
import { jwtConstants } from './constants';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    JwtModule.register({
      // 向 nest 容器注册 jwt 模块，并配置密钥和令牌有效期
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: 3600,
      },
    }),
    forwardRef(() => UserModule), // 处理模块间的循环依赖
    CommonModule,
  ],
  providers: [AuthService, AuthStrategy],
  exports: [AuthService], // 导出 AuthServie 供 UserModule 使用
})
export class AuthModule {}
