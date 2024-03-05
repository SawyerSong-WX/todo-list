import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    BadRequestException,
    Logger,
    UnauthorizedException,
  } from '@nestjs/common';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
  
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
      const message =
        exception instanceof BadRequestException
          ? exception['response']['message']
          : exception['message'];
      if (!(exception instanceof UnauthorizedException)) {
        const logFormat = `AllExceptionsFilter:
          \n <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
          Request original url: ${request.originalUrl}
          IP: ${request.ip}
          Response: ${exception}
          \n <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< `;
        this.logger.error(logFormat);
        if (exception instanceof Error) {
          this.logger.error(exception.stack);
        }
      }
      response.status(status).json({
        code: status,
        msg: `${message}`,
      });
    }
  }
  