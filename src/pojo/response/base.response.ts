export class BaseResponse {
    public code: number;
    public msg: string;
    public data: any;
  
    static successWithData(_data: any) {
      return {
        code: 0,
        data: _data,
      };
    }
  
    static success() {
      return {
        code: 0
      };
    }
  
    static fail(code: number, msg: string) {
      return {
        code,
        msg,
      };
    }
  }
  