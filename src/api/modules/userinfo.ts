import { UserInfo } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
import qs from "qs";
import { request } from "@/api";
import type { TableListItem } from "@/views/user/list/data";

/**
 * @name 用户信息模块
 */
// * 用户修改密码接口
export const ResetPwdApi = (params: UserInfo.ReqResetPwd) => {
	return request.post<boolean>(PORT1 + `/Account/ResetPwd`, params);
	return request.post<boolean>(PORT1 + `/Account/ResetPwd`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456
	return request.post<boolean>(PORT1 + `/Account/ResetPwd`, qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
	return request.post<boolean>(PORT1 + `/Account/ResetPwd`, params, { headers: { noLoading: true } }); // 控制当前请求不显示 loading
};

/** 获取规则列表 GET /api/rule */
export const GetUserPageApi = (params?: any) => {
	return request.getpage<TableListItem[]>(PORT1 + `/Account/GetUserPage`, params);
	return request.getpage<TableListItem[]>(PORT1 + `/Account/GetUserPage`, params, { headers: { noLoading: true } }); // 控制当前请求不显示 loading
};

/** 获取规则列表 GET /api/rule */
export const addRule = (params: { [key: string]: any }) => {
	return request.post<boolean>(PORT1 + `/api/ResetPwd`, params);
	return request.post<boolean>(PORT1 + `/api/ResetPwd`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456
	return request.post<boolean>(PORT1 + `/api/ResetPwd`, qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
	return request.post<boolean>(PORT1 + `/api/ResetPwd`, params, { headers: { noLoading: true } }); // 控制当前请求不显示 loading
};

/** 获取规则列表 GET /api/rule */
export const updateRule = (params: { [key: string]: any }) => {
	return request.post<boolean>(PORT1 + `/api/ResetPwd`, params);
	return request.post<boolean>(PORT1 + `/api/ResetPwd`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456
	return request.post<boolean>(PORT1 + `/api/ResetPwd`, qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
	return request.post<boolean>(PORT1 + `/api/ResetPwd`, params, { headers: { noLoading: true } }); // 控制当前请求不显示 loading
};

/** 获取规则列表 GET /api/rule */
export const removeRule = (params: { [key: string]: any }) => {
	return request.post<boolean>(PORT1 + `/api/ResetPwd`, params);
	return request.post<boolean>(PORT1 + `/api/ResetPwd`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456
	return request.post<boolean>(PORT1 + `/api/ResetPwd`, qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
	return request.post<boolean>(PORT1 + `/api/ResetPwd`, params, { headers: { noLoading: true } }); // 控制当前请求不显示 loading
};
