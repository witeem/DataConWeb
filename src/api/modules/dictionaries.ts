import { MainTenace } from "@/api/config/servicePort";
import qs from "qs";
import { request } from "@/api";

/***
 * Dictionaries
 */
export const GetDictionariesPageApi = (params?: any) => {
	return request.getpage<any[]>(MainTenace + `/Dictionaries/GetDictionariesPage`, params);
};

export const InsertDictionariesApi = (params: any) => {
	return request.post<boolean>(MainTenace + `/Dictionaries/InsertDictionaries`, params);
	return request.post<boolean>(MainTenace + `/Dictionaries/InsertDictionaries`, {}, { params }); // post request carries query parameter ==>? username=admin&password=123456
	return request.post<boolean>(MainTenace + `/Dictionaries/InsertDictionaries`, qs.stringify(params)); // post requests carry form parameters ==> application/x-www-form-urlencoded
};

export const UpdateDictionariesApi = (params: any) => {
	return request.post<boolean>(MainTenace + `/Dictionaries/UpdateDictionaries`, params);
	return request.post<boolean>(MainTenace + `/Dictionaries/UpdateDictionaries`, {}, { params }); // post request carries query parameter ==>? username=admin&password=123456
	return request.post<boolean>(MainTenace + `/Dictionaries/UpdateDictionaries`, qs.stringify(params)); // post requests carry form parameters ==> application/x-www-form-urlencoded
};
