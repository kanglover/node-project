import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorsInterceptor } from './common/interceptors/errors.interceptor';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    UserModule,
    PostModule,
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型
      host: '10.138.24.60', // 数据库的连接地址host
      port: 8306, // 数据库的端口 3306
      username: 'root', // 连接账号
      password: '123456', // 连接密码
      database: 'nest_posts', // 连接的表名
      retryDelay: 500, // 重试连接数据库间隔
      retryAttempts: 10, // 允许重连次数
      synchronize: true, // 是否将实体同步到数据库
      autoLoadEntities: true, // 自动加载实体配置，forFeature()注册的每个实体都自己动加载
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },
  ],
})
export class AppModule {}
