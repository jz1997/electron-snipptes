export default interface DoCommand<T, R> {
  execute(params: T): Promise<R>
}
