import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('SQL_HOST'),
        port: +configService.get<number>('SQL_PORT'),
        username: configService.get<string>('SQL_USER'),
        password: configService.get<string>('SQL_USER_PASSWORD'),
        database: configService.get<string>('SQL_DB'),
        synchronize: !!configService.get<boolean>('SQL_SYNC'),
        entities: [__dirname + '/entities/**'],
        migrations: [__dirname + '/migrations/*.ts'],
        retryAttempts: 3,
        logging: false,
        extra: {
          trustServerCertificate: true,
          ssl: false,
        },
        options: {
          encrypt: true,
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
