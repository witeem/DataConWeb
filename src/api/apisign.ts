import { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import md5 from "js-md5";
import * as CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";
import { store } from "@/redux";

let aesKey = import.meta.env.VITE_AESKEY as string;
let aesIv = import.meta.env.VITE_IVKEY as string;
export const GetKeyBytes = (key: string, keylength: number) => {
	while (key.length < keylength) {
		key += "0";
	}

	return CryptoJS.enc.Utf8.parse(key);
};

export const AESEncrypt = (value: string): string => {
	let keyByte = GetKeyBytes(aesKey, 32);
	let ivByte = GetKeyBytes(aesIv, 16);
	let valueByte = CryptoJS.enc.Utf8.parse(value);
	let ciphertext = CryptoJS.AES.encrypt(valueByte, keyByte, { iv: ivByte }).toString();
	return ciphertext;
};

export const SignHelper = (config: AxiosRequestConfig): AxiosRequestConfig => {
	const timespan: number = Date.now();
	const nonce: string = uuidv4();
	let secretKey: string = "";
	if (config.params) {
		const getQuerys = Object.keys(config.params)
			.filter(key => config.params[key] !== null && config.params[key] !== undefined)
			.reduce(
				(acc, key) => ({
					...acc,
					[key]: config.params[key]
				}),
				{}
			);
		secretKey = AESEncrypt(JSON.stringify(getQuerys));
	}

	if (config.data && !Array.isArray(config.data)) {
		const postParams = Object.keys(config.data)
			.filter(key => config.data[key] !== null && config.data[key] !== undefined)
			.reduce(
				(acc, key) => ({
					...acc,
					[key]: config.data[key]
				}),
				{}
			);
		secretKey = AESEncrypt(JSON.stringify(postParams));
	}

	let sign = md5(secretKey + timespan + nonce);
	const token: string = store.getState().global.token;
	let customHeaders: AxiosRequestHeaders = {
		language: "zh-cn",
		"x-access-token": token,
		"x-nonce": nonce,
		"x-timespan": timespan,
		"x-sign": sign
	};
	config.headers = customHeaders;
	return { ...config, headers: { ...config.headers } };
};
