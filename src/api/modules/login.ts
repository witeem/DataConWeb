import { Login } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
import qs from "qs";

import { request } from "@/api";

/**
 * @name Login module
 */
// * User login interface
export const RegisterApi = (params: any) => {
	return request.post<string>(PORT1 + `/Account/Register`, params);
	return request.post<string>(PORT1 + `/Account/Register`, {}, { params });
	return request.post<string>(PORT1 + `/Account/Register`, qs.stringify(params));
};

export const LoginApi = (params: Login.ReqLoginForm) => {
	return request.post<string>(PORT1 + `/Account/Login`, params);
	return request.post<string>(PORT1 + `/Account/Login`, {}, { params });
	return request.post<string>(PORT1 + `/Account/Login`, qs.stringify(params));
};

// * Refreshing token interface
export const RefreshTokenApi = () => {
	return request.post<string>(PORT1 + `/Account/RefreshToken`);
	return request.post<string>(PORT1 + `/Account/RefreshToken`, {}, {});
	return request.post<string>(PORT1 + `/Account/RefreshToken`, qs.stringify());
};

// * User logout interface
export const LogoutApi = () => {
	return request.post<boolean>(PORT1 + `/Account/Logout`);
};

// * Interface for users to change passwords
export const UpdatePwdApi = (params: Login.ReqLoginForm) => {
	return request.post<boolean>(PORT1 + `/Account/UpdatePwd`, params);
	return request.post<boolean>(PORT1 + `/Account/UpdatePwd`, {}, { params });
	return request.post<boolean>(PORT1 + `/Account/UpdatePwd`, qs.stringify(params));
};

// *
export const getAuthorButtons = () => {
	return request.get<Login.ResAuthButtons>(PORT1 + `/auth/buttons`);
};

// *
export const getMenuList = () => {
	return request.get<Menu.MenuOptions[]>(PORT1 + `/Roles/GetMenuInfosByRole`);
};
