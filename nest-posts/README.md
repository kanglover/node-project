## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

这是一个简单的文章管理后台系统。

主要功能：
* 用户注册、登录、授权、认证
* 使用 @nestjs/typeorm typeorm mysql2 做数据存储
* 使用 crypto、@nestjs/jwt 做用户信息加密和用户令牌认证

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
