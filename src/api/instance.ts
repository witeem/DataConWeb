import axios, { AxiosInstance, AxiosRequestHeaders, AxiosResponse } from "axios";
import { store } from "@/redux";
import { RefreshTokenApi } from "./modules/login";
import { setToken } from "@/redux/modules/global/action";
import { ResultEnum } from "@/enums/httpEnum";
import { message } from "antd";
import { SignHelper } from "./apisign";

let baseURL = import.meta.env.VITE_API_URL as string;
let isRefreshing = false;
let retryRequests: any = []; // Defines an empty array that holds the request queue
const timeout = 30000;

// RefreshToken
const RefreshToken = async () => {
	try {
		const { data } = await RefreshTokenApi();
		return data;
	} catch (ex: any) {
		return "";
	}
};

const Instance: AxiosInstance = axios.create({
	timeout,
	baseURL,
	withCredentials: true
});

Instance.interceptors.request.use(config => {
	// return { ...config, headers: { ...config.headers } };
	return SignHelper(config);
});

Instance.interceptors.response.use(
	(response: AxiosResponse) => {
		if (response.data.code !== 200) {
			return Promise.reject(response.data);
		}

		return response;
	},
	async error => {
		if (error) {
			const originalRequest = error.config;
			switch (error.response.status) {
				case 401:
					{
						store.dispatch(setToken(""));
						window.location.hash = "/login";
					}
					break;

				case 404:
					{
						message.warn("Request error: Request  not found");
					}
					break;

				case 500:
					{
						message.warn(`Request error: ${error.message}`);
					}
					break;

				case ResultEnum.AuthenticationTimeout: {
					if (!isRefreshing) {
						isRefreshing = true;
						try {
							let newToken = await RefreshToken();
							store.dispatch(setToken(newToken));

							let customHeaders: AxiosRequestHeaders = {
								language: "zh-cn",
								"x-access-token": newToken
							};
							originalRequest.headers.Authorization = customHeaders;

							//Traversing the cache queue initiates a request for the latest token
							retryRequests.forEach((callback: () => any) => callback);

							// Clear the queue after the retry
							retryRequests = [];
							return Instance(originalRequest);
						} catch (error) {
							Promise.reject(error);
						} finally {
							isRefreshing = false;
						}
					} else {
						return new Promise(resolve => {
							// Enqueue resolve as a function until the token is refreshed
							retryRequests.push(resolve(Instance(originalRequest)));
						});
					}
				}
			}
		}

		return Promise.reject(error);
	}
);

export default Instance;
