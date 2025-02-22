import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

config();
const configService = new ConfigService();

const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: configService.get<string>('SQL_HOST'),
  port: +configService.get<number>('SQL_PORT'),
  username: configService.get<string>('SQL_USER'),
  password: configService.get<string>('SQL_USER_PASSWORD'),
  database: configService.get<string>('SQL_DB'),
  synchronize: !!configService.get<boolean>('SQL_SYNC'),
  entities: [__dirname + '/typeOrm/entities/**'],
  migrations: [__dirname + '/typeOrm/migrations/*.ts'],
  extra: {
    trustServerCertificate: true,
    ssl: false,
  },
};

export default new DataSource(dataSourceOptions);
