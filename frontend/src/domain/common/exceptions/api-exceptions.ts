export class BadRequestException extends Error {
  status = 400;
  response: Response;
  error: any;
  constructor(response: Response, error: any) {
    super();
    this.message = `${response.status} Bad Request (${response.url})\n`;
    this.message += `body: ${JSON.stringify(error)}`;
    this.error = error;
    this.response = response;
  }
}

export class UnauthorizedException extends Error {
  status = 401;
  response: Response;
  error: any;
  constructor(response: Response, error: any) {
    super();
    this.message = `${response.status} Unauthorized (${response.url}): `;
    this.message += JSON.stringify(error);
    this.error = error;
    this.response = response;
  }
}

export class NotFoundException extends Error {
  status = 404;
  response: Response;
  error: any;
  constructor(response: Response, error: any) {
    super();
    this.message = `${response.status} Not Found (${response.url})\n`;
    this.message += `body: ${JSON.stringify(error)}`;
    this.error = error;
    this.response = response;
  }
}

export class ConflictException extends Error {
  status = 409;
  response: Response;
  error: any;
  constructor(response: Response, error: any) {
    super();
    this.message = `${response.status} Not Found (${response.url})\n`;
    this.message += `body: ${JSON.stringify(error)}`;
    this.error = error;
    this.response = response;
  }
}

export class ClientException extends Error {
  status: number;
  response: Response;
  error: any;
  constructor(response: Response, error: any) {
    super();
    this.message = `${response.status} Client Error (${response.url})\n`;
    this.message += `body: ${JSON.stringify(error)}`;
    this.status = response.status;
    this.error = error;
    this.response = response;
  }
}

export class ServerException extends Error {
  status: number;
  response: Response;
  error: any;
  constructor(response: Response, error: any) {
    super();
    this.message = `${response.status} Server Error (${response.url})\n`;
    // this.message += `body: ${JSON.stringify(error)}`
    this.status = response.status;
    this.error = error;
    this.response = response;
  }
}
