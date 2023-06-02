import { AxiosRequestConfig } from "axios";
import { PageResultData, ResultData } from "@/api/interface";
import Instance from "./instance";

// The core processing code will return a promise call and then get the business data for the response
const requestHandler = <T>(
	method: "get" | "post" | "put" | "delete",
	url: string,
	params?: object,
	config: AxiosRequestConfig = {}
): Promise<T> => {
	let response: Promise<ResultData<T>>;
	switch (method) {
		case "get":
			response = Instance.get(url, { params: { ...params }, ...config });
			break;
		case "post":
			response = Instance.post(url, params, { ...config });
			break;
		case "put":
			response = Instance.put(url, params, { ...config });
			break;
		case "delete":
			response = Instance.delete(url, { params: { ...params }, ...config });
			break;
	}

	return new Promise<T>((resolve, reject) => {
		response
			.then(res => {
				const data = res;
				resolve(data.data);
			})
			.catch(error => {
				reject(error);
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
