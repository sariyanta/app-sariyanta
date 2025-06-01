import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class HttpTimingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(HttpTimingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();

    const controllerClass = context.getClass();
    const handler = context.getHandler();
    const controllerName = controllerClass.name;
    const handlerName = handler.name;

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;
        const req = context.switchToHttp().getRequest<Request>();
        this.logger.log(
          `[${controllerName}.${handlerName}] call to ${req.url} took ${duration}ms`,
        );
      }),
    );
  }
}
