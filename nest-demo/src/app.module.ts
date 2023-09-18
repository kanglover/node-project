import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorsInterceptor } from './common/error.interceptor';

@Module({
  imports: [
    UserModule,
    // TypeOrmModule.forRoot() 默认加载项目根目录下的 ormconfig.json 配置文件用于配置数据库连接
    // TypeORM 配置文件详细文档 https://typeorm.io/#/using-ormconfig
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型
      host: '10.138.24.60', // 数据库的连接地址host
      port: 8306, // 数据库的端口 3306
      username: 'root', // 连接账号
      password: '123456', // 连接密码
      database: 'nest_demo', // 连接的表名
      retryDelay: 500, // 重试连接数据库间隔
      retryAttempts: 10, // 允许重连次数
      synchronize: true, // 是否将实体同步到数据库
      autoLoadEntities: true, // 自动加载实体配置，forFeature()注册的每个实体都自己动加载
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
