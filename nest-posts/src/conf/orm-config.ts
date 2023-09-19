import { DataSourceOptions } from 'typeorm';

const config: DataSourceOptions = {
  type: 'mysql',
  host: '10.138.24.60',
  port: 8306,
  username: 'root',
  password: '123456',
  database: 'nest_posts',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
export default config;
