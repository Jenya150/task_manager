import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus } from '@nestjs/common'

import {
  ActiveProjectsLimitError, EmailIsInvalidError,
  InvalidProjectIdError,
  ProjectAlreadyActiveError, UsernameIsInvalidError,
  UsernameIsRequiredError, UserNotFoundError,
} from './errors';

@Catch(
  ActiveProjectsLimitError,
  ProjectAlreadyActiveError,
  InvalidProjectIdError,
  UserNotFoundError,
  UsernameIsRequiredError,
  UsernameIsInvalidError,
  EmailIsInvalidError
)
export class DomainExceptionFilterForUsers implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse()//<DomainExceptionFilter>()

    const status = HttpStatus.BAD_REQUEST;

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      error: exception.name
    });
  }
}