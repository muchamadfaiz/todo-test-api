import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Swagger Documentation Setup
  const config = new DocumentBuilder()
    .setTitle('Todo Test API')
    .setDescription('REST API untuk pengujian deployment otomatis')
    .setVersion('1.0')
    .addTag('todos')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Todo Test API is running on http://0.0.0.0:${port}`);
  console.log(`📖 Swagger docs available at http://0.0.0.0:${port}/docs`);
}
bootstrap();
