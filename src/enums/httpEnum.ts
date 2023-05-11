// * 请求枚举配置
/**
 * @description：请求配置
 */
export enum ResultEnum {
	SUCCESS = 200,
	AuthenticationTimeout = 419,
	ERROR = 500,
	OVERDUE = 599,
	UnAuthorization = 1401,
	RefreshToken = 1402,
	SignException = 1403,
	Undefind = 1404,
	Error = 1502,
	ParamsError = 1504,
	TIMEOUT = 10000,
	TYPE = "success"
}

/**
 * @description：请求方法
 */
export enum RequestEnum {
	GET = "GET",
	POST = "POST",
	PATCH = "PATCH",
	PUT = "PUT",
	DELETE = "DELETE"
}

/**
 * @description：常用的contentTyp类型
 */
export enum ContentTypeEnum {
	// json
	JSON = "application/json;charset=UTF-8",
	// text
	TEXT = "text/plain;charset=UTF-8",
	// form-data 一般配合qs
	FORM_URLENCODED = "application/x-www-form-urlencoded;charset=UTF-8",
	// form-data 上传
	FORM_DATA = "multipart/form-data;charset=UTF-8"
}
