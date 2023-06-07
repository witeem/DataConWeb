import { UserInfo } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
import qs from "qs";
import { request } from "@/api";
import type { TableListItem } from "@/views/user/list/data";

/**
 * @name User information module
 */
// *
export const resetPwdApi = (params: UserInfo.ReqResetPwd) => {
	return request.post<boolean>(PORT1 + `/users/ResetPwd`, params);
	return request.post<boolean>(PORT1 + `/users/ResetPwd`, {}, { params }); // post request carries query parameter ==>? username=admin&password=123456
	return request.post<boolean>(PORT1 + `/users/ResetPwd`, qs.stringify(params)); // post requests carry form parameters ==> application/x-www-form-urlencoded
};

export const updateUserApi = (params: any) => {
	return request.post<boolean>(PORT1 + `/users/UpdateUser`, params);
	return request.post<boolean>(PORT1 + `/users/UpdateUser`, {}, { params }); // post request carries query parameter ==>? username=admin&password=123456
	return request.post<boolean>(PORT1 + `/users/UpdateUser`, qs.stringify(params)); // post requests carry form parameters ==> application/x-www-form-urlencoded
};

/**  */
export const getUserPageApi = (params?: any) => {
	return request.getpage<TableListItem[]>(PORT1 + `/users/GetUserPage`, params);
};
