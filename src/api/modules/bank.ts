import { MainTenace } from "@/api/config/servicePort";
import qs from "qs";
import { request } from "@/api";

/***
 * Bank
 */
export const GetBankPageApi = (params?: any) => {
	return request.getpage<any[]>(MainTenace + `/Bank/GetBankPage`, params);
};

export const InsertBankApi = (params: any) => {
	return request.post<boolean>(MainTenace + `/Bank/InsertBank`, params);
	return request.post<boolean>(MainTenace + `/Bank/InsertBank`, {}, { params }); // post request carries query parameter ==>? username=admin&password=123456
	return request.post<boolean>(MainTenace + `/Bank/InsertBank`, qs.stringify(params)); // post requests carry form parameters ==> application/x-www-form-urlencoded
};

export const UpdateBankApi = (params: any) => {
	return request.post<boolean>(MainTenace + `/Bank/UpdateBank`, params);
	return request.post<boolean>(MainTenace + `/Bank/UpdateBank`, {}, { params }); // post request carries query parameter ==>? username=admin&password=123456
	return request.post<boolean>(MainTenace + `/Bank/UpdateBank`, qs.stringify(params)); // post requests carry form parameters ==> application/x-www-form-urlencoded
};
