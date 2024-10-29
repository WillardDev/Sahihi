import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS with configuration
  app.enableCors({
    origin: 'http://localhost:8080', // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true // Allows cookies and other credentials if needed
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
