export class BadRequestException extends Error {
  status = 400;
  constructor(status: number) {
    super();
    this.message = `${status} Bad Request`;
  }
}

export class UnauthorizedException extends Error {
  status = 401;
  constructor(status: number) {
    super();
    this.message = `${status} Unauthorized `;
  }
}

export class NotFoundException extends Error {
  status = 404;
  constructor(status: number) {
    super();
    this.message = `${status} Not Found`;
  }
}

export class ConflictException extends Error {
  status = 409;
  constructor(status: number) {
    super();
    this.message = `${status} Conflict`;
  }
}

export class ClientException extends Error {
  status: number;
  constructor(status: number) {
    super();
    this.message = `${status} Client Error`;
    this.message += `body`;
    this.status = status;
  }
}

export class ServerException extends Error {
  status: number;
  constructor(status: number) {
    super();
    this.message = `${status} Server Error`;
    this.status = status;
  }
}
