import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './modules/customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TraceInterceptor } from './interceptors/trace.interceptor';
import { CustomerEntity } from './modules/customer/entities/customer.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [CustomerEntity],
      synchronize: true,
      ssl: true,
    }),
    CustomerModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TraceInterceptor,
    },
  ],
})
export class AppModule {}
