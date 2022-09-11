import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 5000;
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(PORT);
}
bootstrap();
