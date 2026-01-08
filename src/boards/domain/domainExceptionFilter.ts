import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus } from '@nestjs/common'

import {
  BoardNotFoundError, DescriptionIsInvalidError,
  OwnerAlreadyExistsError,
  OwnerCannotBeRemovedError,
  OwnerUserUUIDIsInvalidError,
  OwnerUserUUIDIsRequiredError, RoleIsInvalidError,
  TitleIsInvalidError,
  TitleIsRequiredError,
  UserAlreadyAddedError,
  UserNotFoundError,
  UsersLimitReachedError,
} from './errors';

@Catch(
  BoardNotFoundError,
  UserAlreadyAddedError,
  UsersLimitReachedError,
  OwnerAlreadyExistsError,
  OwnerCannotBeRemovedError,
  UserNotFoundError,
  TitleIsRequiredError,
  TitleIsInvalidError,
  OwnerUserUUIDIsRequiredError,
  OwnerUserUUIDIsInvalidError,
  DescriptionIsInvalidError,
  RoleIsInvalidError
)
export class DomainExceptionFilterForBoards implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse()

    const status = HttpStatus.BAD_REQUEST;

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      error: exception.name
    });
  }
}