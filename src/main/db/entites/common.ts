export class Result<T> {
  public success: boolean
  public message: string
  public data?: T

  public constructor(success: boolean, message: string, data: T) {
    this.success = success
    this.message = message
    this.data = data
  }

  public static success<T>(data: T): Result<T> {
    return new Result(true, '操作成功', data)
  }

  public static fail(message: string): Result<null> {
    return new Result<null>(false, message, null)
  }
}
