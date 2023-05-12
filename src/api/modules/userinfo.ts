import { UserInfo } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
import qs from "qs";
import { request } from "@/api";
import type { TableListItem } from "@/views/user/list/data";

/**
 * @name User information module
 */
// *
export const ResetPwdApi = (params: UserInfo.ReqResetPwd) => {
	return request.post<boolean>(PORT1 + `/Account/ResetPwd`, params);
	return request.post<boolean>(PORT1 + `/Account/ResetPwd`, {}, { params }); // post request carries query parameter ==>? username=admin&password=123456
	return request.post<boolean>(PORT1 + `/Account/ResetPwd`, qs.stringify(params)); // post requests carry form parameters ==> application/x-www-form-urlencoded
};

/**  */
export const GetUserPageApi = (params?: any) => {
	return request.getpage<TableListItem[]>(PORT1 + `/Account/GetUserPage`, params);
};

/**  */
export const addRule = (params: { [key: string]: any }) => {
	return request.post<boolean>(PORT1 + `/api/ResetPwd`, params);
	return request.post<boolean>(PORT1 + `/api/ResetPwd`, {}, { params }); // post request carries query parameter ==>? username=admin&password=123456
	return request.post<boolean>(PORT1 + `/api/ResetPwd`, qs.stringify(params)); // post requests carry form parameters ==> application/x-www-form-urlencoded
};

/**  */
export const updateRule = (params: { [key: string]: any }) => {
	return request.post<boolean>(PORT1 + `/api/ResetPwd`, params);
	return request.post<boolean>(PORT1 + `/api/ResetPwd`, {}, { params }); // post request carries query parameter ==>? username=admin&password=123456
	return request.post<boolean>(PORT1 + `/api/ResetPwd`, qs.stringify(params)); // post requests carry form parameters ==> application/x-www-form-urlencoded
};

/**  */
export const removeRule = (params: { [key: string]: any }) => {
	return request.post<boolean>(PORT1 + `/api/ResetPwd`, params);
	return request.post<boolean>(PORT1 + `/api/ResetPwd`, {}, { params }); // post request carries query parameter ==>? username=admin&password=123456
	return request.post<boolean>(PORT1 + `/api/ResetPwd`, qs.stringify(params)); // post requests carry form parameters ==> application/x-www-form-urlencoded
};
