import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './todos/todos.module';
import { Todo } from './todos/entities/todo.entity';

@Module({
  imports: [
    // Load .env / environment variables
    ConfigModule.forRoot({
      isGlobal: true,
    }),

   TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: 'postgres',
    host: config.get<string>('DB_HOST'),
    port: Number(config.get('DB_PORT')),
    username: config.get<string>('DB_USER'),
    password: config.get<string>('DB_PASSWORD'),
    database: config.get<string>('DB_NAME'),

    entities: [Todo],

    synchronize: false,

    // ✅ MUST be false for this server
    ssl: false,
  }),
}),


    TodosModule,
  ],
})
export class AppModule {}
