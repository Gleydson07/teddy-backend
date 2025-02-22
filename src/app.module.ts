import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ClientsModule } from './clients/clients.module';
import { RouterModule } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot({
      errorMessage: 'Número máximo de requisições atingido.',
      throttlers: [
        {
          name: 'short',
          ttl: 10000,
          limit: 5,
          blockDuration: 60000,
        },
        {
          name: 'medium',
          ttl: 30000,
          limit: 20,
          blockDuration: 120000,
        },
        {
          name: 'long',
          ttl: 120000,
          limit: 50,
          blockDuration: 600000,
        },
      ],
    }),
    DatabaseModule,
    ClientsModule,
    RouterModule.register([
      {
        path: '/clients',
        module: ClientsModule,
      },
    ]),
  ],
})
export class AppModule {}
