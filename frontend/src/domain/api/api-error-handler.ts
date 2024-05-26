import {
  BadRequestException,
  ClientException,
  ConflictException,
  NotFoundException,
  ServerException,
  UnauthorizedException,
} from "~/domain/common/exceptions/api-exceptions";

export function handleErrorResponse(status: number) {
  if (status === 401) {
    throw new UnauthorizedException(status);
  } else if (status === 400) {
    throw new BadRequestException(status);
  } else if (status === 404) {
    throw new NotFoundException(status);
  } else if (status === 409) {
    throw new ConflictException(status);
  } else if (status >= 402 && status < 500) {
    console.error(status);
    throw new ClientException(status);
  } else if (status >= 500) {
    console.error(status);
    throw new ServerException(status);
  }
}
