import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorsInterceptor } from './common/interceptors/errors.interceptor';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import ormConfig from './conf/orm-config';

@Module({
  imports: [UserModule, PostModule, TypeOrmModule.forRoot(ormConfig)],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },
  ],
})
export class AppModule {}
