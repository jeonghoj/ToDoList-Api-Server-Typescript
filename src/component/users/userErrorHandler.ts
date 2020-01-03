export default class UserErrorHandler extends Error {
  public statusCode: number;
  public message: string;

  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
