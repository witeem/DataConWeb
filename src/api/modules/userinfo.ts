import { Login } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
import qs from "qs";

import http from "@/api";

/**
 * @name 用户信息模块
 */
// * 用户修改密码接口
export const ResetPwdApi = (params: Login.ReqLoginForm) => {
	return http.post<boolean>(PORT1 + `/Account/ResetPwd`, params);
	return http.post<boolean>(PORT1 + `/Account/ResetPwd`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456
	return http.post<boolean>(PORT1 + `/Account/ResetPwd`, qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
	return http.post<boolean>(PORT1 + `/Account/ResetPwd`, params, { headers: { noLoading: true } }); // 控制当前请求不显示 loading
};
