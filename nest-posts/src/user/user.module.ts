import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    // 向用户模块注册 passport，并配置默认策略为 jwt，因为覆盖了默认的策略，所以要在每个使用 @AuthGuard() 的模块导入 PassportModule
    PassportModule.register({ defaultStrategy: 'jwt' }),
    forwardRef(() => AuthModule), // 处理模块间的循环依赖
    CommonModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
