import { BaseResponse } from './base.response';

export const userErrorResponse = {
  invalidVerifyCode: BaseResponse.fail(6001, 'Invalid verify code'),
  userNotExistError: BaseResponse.fail(6002, 'User is not exist'),
};

export const commonErrorResponse = {
  invalidArgs: BaseResponse.fail(1001, 'Invalid args'),
  notYours: BaseResponse.fail(1002, 'Item is not yours'),
  statusError: BaseResponse.fail(1003, 'Status error'),
  notExist: BaseResponse.fail(7003, 'Item is not exist'),
};
