// * 请求响应参数(不包含data)
export interface Result {
	code: number;
	msg: string;
	success: boolean;
}

// * 分页请求参数
export interface ReqPage {
	current: number;
	pageSize: number;
}

// * 请求响应参数(不包含data)
export interface PageResult {
	code: number;
	msg: string;
	success: boolean;
	current: number;
	pageSize: number;
	pageTotal: number;
	total: number;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
	title: string;
	data: T;
}

export interface PageResultData<T = any> extends PageResult {
	data: T;
}

// * 登录
export namespace Login {
	export interface ReqLoginForm {
		userId: string;
		password: string;
	}
	export interface ResLogin {
		access_token: string;
		data: string;
	}
	export interface ResAuthButtons {
		[propName: string]: any;
	}

	export interface CurrentUser {
		userId: string;
		userName: string;
		roles: string;
		roleType: string;
		mallId: string;
		departmentId: string;
		active: string;
		isReceiveEmail: string;
		isReceiveEODMail: string;
	}
}

// * 用户信息
export namespace UserInfo {
	export interface ReqResetPwd {
		password: string;
		userId: string;
	}

	export interface ReqUserPage extends ReqPage {
		userId?: Number;
	}
}

// * 角色信息
export namespace RoleInfo {
	export interface ReqResetPwd {
		password: string;
		userId: string;
	}

	export interface ReqUserPage extends ReqPage {
		userId?: Number;
	}
}
