import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { PageResultData, ResultData } from "@/api/interface";
import { ResultEnum } from "@/enums/httpEnum";
import { message } from "antd";
import { store } from "@/redux";
import { RefreshTokenApi } from "@/api/modules/login";
import { setToken } from "@/redux/modules/global/action";

// The base URL, axios will concatenate it automatically
// process.env.NODE_ENV Determines whether it is a development environment. Use different baseURL based on different environments to facilitate debugging
let baseURL = import.meta.env.VITE_API_URL as string;

// Default request timeout period
const timeout = 30000;

// Create an axios instance
const service = axios.create({
	timeout,
	baseURL,
	// Set this value to true if cookies are to be carried
	withCredentials: true
});

// RefreshToken
const RefreshToken = async () => {
	try {
		const { data } = await RefreshTokenApi();
		console.log("refreshToken", data);
		setToken(data);
	} catch (ex: any) {
		window.location.hash = "/login";
		return Promise.reject(ex);
	}
};

// You can configure headers, such as language and token, for unified request interception
service.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		const token: string = store.getState().global.token;

		// Configure a custom request header
		let customHeaders: AxiosRequestHeaders = {
			language: "zh-cn"
		};
		config.headers = customHeaders;
		return { ...config, headers: { ...config.headers, "x-access-token": token } };
	},
	error => {
		Promise.reject(error);
	}
);

// The core processing code will return a promise call and then get the business data for the response
const requestHandler = <T>(
	method: "get" | "post" | "put" | "delete",
	url: string,
	params: object = {},
	config: AxiosRequestConfig = {}
): Promise<T> => {
	let response: Promise<ResultData<T>>;
	switch (method) {
		case "get":
			response = service.get(url, { params: { ...params }, ...config });
			break;
		case "post":
			response = service.post(url, { ...params }, { ...config });
			break;
		case "put":
			response = service.put(url, { ...params }, { ...config });
			break;
		case "delete":
			response = service.delete(url, { params: { ...params }, ...config });
			break;
	}

	return new Promise<T>((resolve, reject) => {
		response
			.then(res => {
				const data = res;
				if (data.code && data.code !== ResultEnum.SUCCESS) {
					if (data.code == 401) {
						message.warn("Your account has logged out or timed out and is about to log out...");
					}

					let e = JSON.stringify(data);
					message.warn(`Request error:${e}`);

					// Data request error Using reject returns the error
					reject(data);
				} else {
					// Data requests are returned with resolve properly
					resolve(data.data);
				}
			})
			.catch(error => {
				switch (error.response?.status) {
					case 401: {
						store.dispatch(setToken(""));
						window.location.hash = "/login";
						return reject(error);
					}

					case 404: {
						return reject(error);
					}

					case 500: {
						return reject(error);
					}

					case ResultEnum.AuthenticationTimeout: {
						RefreshToken();
						console.log(config);
					}
				}

				// let e = JSON.stringify(error);
				// message.warn(`network error ${e}`);
				// console.log(`network error ${e}`);
				// reject(error);
			});
	});
};

// Unified invocation using request, including wrapped get, post, put, delete, etc
const request = {
	get: <T>(url: string, params?: object, config?: AxiosRequestConfig) =>
		requestHandler<ResultData<T>>("get", url, params, config),
	getpage: <T>(url: string, params?: object, config?: AxiosRequestConfig) =>
		requestHandler<PageResultData<T>>("get", url, params, config),
	post: <T>(url: string, params?: object, config?: AxiosRequestConfig) =>
		requestHandler<ResultData<T>>("post", url, params, config),
	put: <T>(url: string, params?: object, config?: AxiosRequestConfig) =>
		requestHandler<ResultData<T>>("put", url, params, config),
	delete: <T>(url: string, params?: object, config?: AxiosRequestConfig) =>
		requestHandler<ResultData<T>>("delete", url, params, config)
};

// Export to outer layer for easy unified use
export { request };
