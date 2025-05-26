import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return (
      'Hello World!' +
      ' ' +
      process.env['MY_SECRET'] +
      ' ' +
      process.env['NODE_ENV']
    );
  }
}
