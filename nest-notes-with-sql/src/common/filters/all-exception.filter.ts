import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { QueryFailedError } from "typeorm";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let errors: any;

    // 1) أخطاء HTTP (مثل ValidationPipe)
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      if (typeof res === 'object' && Array.isArray((res as any).message)) {
        errors = (res as any).message;
      } else if (typeof res === 'object') {
        errors = (res as any).message || res;
      } else {
        errors = res;
      }
    }
    // 2) أخطاء استعلام TypeORM
    else if (exception instanceof QueryFailedError) {
      status = HttpStatus.BAD_REQUEST;
      // تعرض الرسالة الأصلية من قاعدة البيانات
      errors = (exception as any).message;
    }
    // 3) أي خطأ آخر نعتبره 500
    else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errors = 'Internal server error';
      // إن أردت، يمكنك تسجيل الاستثناء في سجلّ الأخطاء هنا
      console.error('Unexpected error:', exception);
    }

    response.status(status).json({
      statusCode: status,
      errors,
      path: request.url,
      timestamp: new Date().toISOString(),
    });

  }
}
