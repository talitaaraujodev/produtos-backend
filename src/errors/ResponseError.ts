export default class ResponseError {
    public readonly data: string;
    public readonly status: number;

    constructor (data?: any, status?: number) {
      this.data = data
      this.status = status
    }
}