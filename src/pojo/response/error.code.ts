import { BaseResponse } from './base.response';

export const userErrorResponse = {
  invalidVerifyCode: BaseResponse.fail(6001, 'Invalid verify code'),
  userNotExistError: BaseResponse.fail(6002, 'User is not exist'),
};

export const taskErrorResponse = {
  createError: BaseResponse.fail(5001, 'Create task error'),
  notExistError: BaseResponse.fail(5002, 'Task is not exist'),
  notYoursError: BaseResponse.fail(5003, 'Task is not yours'),
  notSameTeamError: BaseResponse.fail(5004, 'Task is not your team'),
  alreadyFollowError: BaseResponse.fail(5005, 'Task is already followed'),
  notFollowError: BaseResponse.fail(5006, 'Task is not followed'),
};

export const commonErrorResponse = {
  invalidArgs: BaseResponse.fail(1001, 'Invalid args'),
  notYours: BaseResponse.fail(1002, 'Item is not yours'),
  statusError: BaseResponse.fail(1003, 'Status error'),
  notExist: BaseResponse.fail(7003, 'Item is not exist'),
};
