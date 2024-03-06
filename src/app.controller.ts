import { Controller, Get } from '@nestjs/common';

@Controller('app')
export class AppController {
  constructor() {}

  @Get('status')
  status(): string {
    return 'ok';
  }
}
