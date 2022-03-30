import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import { config } from 'rxjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  //Swagger config
  const swaggerConfig = new DocumentBuilder()
      .setTitle('User Services')
      .setDescription('User Services use NestJS')
      .setVersion('1.0')
      .addTag('Users')
      .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, document) // Api document router
  
  await app.listen(3001);
}
bootstrap();
