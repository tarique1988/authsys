export class CustomError extends Error{
  statusCode: number
  constructor(name: string, statusCode: number, message: string) {
    super(message)
    this.name = name;
    this.statusCode = statusCode;
  }
}