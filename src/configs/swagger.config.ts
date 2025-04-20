import { DocumentBuilder } from '@nestjs/swagger';

export class swaggerConfig {
  public builder = new DocumentBuilder();

  public initializeOptions() {
    return this.builder
      .setTitle('Penmong Swagger Page')
      .setDescription('Penmong의 API 동작 과정을 확인할 수 있습니다.')
      .setVersion('1.0.0')
      .build();
  }
}
