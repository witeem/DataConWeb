import { Login } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
import qs from "qs";

import http from "@/api";

/**
 * @name 登录模块
 */
// * 用户登录接口
export const LoginApi = (params: Login.ReqLoginForm) => {
	return http.post<Login.ResLogin>(PORT1 + `/Account/Login`, params);
	return http.post<Login.ResLogin>(PORT1 + `/Account/Login`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456
	return http.post<Login.ResLogin>(PORT1 + `/Account/Login`, qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
	return http.post<Login.ResLogin>(PORT1 + `/Account/Login`, params, { headers: { noLoading: true } }); // 控制当前请求不显示 loading
};

// * 刷新token接口
export const RefreshTokenApi = () => {
	return http.post<Login.ResLogin>(PORT1 + `/Account/RefreshToken`);
	return http.post<Login.ResLogin>(PORT1 + `/Account/RefreshToken`, {}, {}); // post 请求携带 query 参数  ==>  ?username=admin&password=123456
	return http.post<Login.ResLogin>(PORT1 + `/Account/RefreshToken`, qs.stringify()); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
	return http.post<Login.ResLogin>(PORT1 + `/Account/RefreshToken`, { headers: { noLoading: true } }); // 控制当前请求不显示 loading
};

// * 用户注销接口
export const LogoutApi = (params: Login.ReqLoginForm) => {
	return http.post<boolean>(PORT1 + `/Account/Logout`, params);
	return http.post<boolean>(PORT1 + `/Account/Logout`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456
	return http.post<boolean>(PORT1 + `/Account/Logout`, qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
	return http.post<boolean>(PORT1 + `/Account/Logout`, params, { headers: { noLoading: true } }); // 控制当前请求不显示 loading
};

// * 用户修改密码接口
export const UpdatePwdApi = (params: Login.ReqLoginForm) => {
	return http.post<boolean>(PORT1 + `/Account/UpdatePwd`, params);
	return http.post<boolean>(PORT1 + `/Account/UpdatePwd`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456
	return http.post<boolean>(PORT1 + `/Account/UpdatePwd`, qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
	return http.post<boolean>(PORT1 + `/Account/UpdatePwd`, params, { headers: { noLoading: true } }); // 控制当前请求不显示 loading
};

// * 获取按钮权限
export const getAuthorButtons = () => {
	return http.get<Login.ResAuthButtons>(PORT1 + `/auth/buttons`);
};

// * 获取菜单列表
export const getMenuList = () => {
	return http.get<Menu.MenuOptions[]>(PORT1 + `/Roles/GetMenuInfosByRole`);
};
