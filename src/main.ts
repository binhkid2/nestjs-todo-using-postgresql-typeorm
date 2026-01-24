import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ===== CORS =====
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'http://localhost:3000',
      /\.rubito\.jp$/,
      /\.vercel\.app$/,
    ],
    credentials: true,
  });

  // ===== Swagger =====
  const config = new DocumentBuilder()
    .setTitle('Todos API')
    .setDescription('Task / Todo API (Spring-compatible schema)')
    .setVersion('1.0')
    .addServer('http://localhost:3000')
    .addServer('https://java-spring-todos-api.rubito.jp')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}

bootstrap();
