import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
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

  // ===== Global Validation Pipe =====
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // ===== Swagger =====
  const config = new DocumentBuilder()
    .setTitle('Todos API')
    .setDescription('Task / Todo API with JWT Authentication')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT access_token here',
      },
      'JWT',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}

bootstrap();
