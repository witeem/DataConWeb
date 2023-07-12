import { MainTenace } from "@/api/config/servicePort";
import qs from "qs";
import { request } from "@/api";

/***
 * Denomination
 */
export const GetdDnominationPageApi = (params?: any) => {
	return request.getpage<any[]>(MainTenace + `/Denomination/GetDenominationPage`, params);
};

export const InsertdDnominationApi = (params: any) => {
	return request.post<boolean>(MainTenace + `/Denomination/InsertDenomination`, params);
	return request.post<boolean>(MainTenace + `/Denomination/InsertDenomination`, {}, { params }); // post request carries query parameter ==>? username=admin&password=123456
	return request.post<boolean>(MainTenace + `/Denomination/InsertDenomination`, qs.stringify(params)); // post requests carry form parameters ==> application/x-www-form-urlencoded
};

export const UpdatedDnominationApi = (params: any) => {
	return request.post<boolean>(MainTenace + `/Denomination/UpdateDenomination`, params);
	return request.post<boolean>(MainTenace + `/Denomination/UpdateDenomination`, {}, { params }); // post request carries query parameter ==>? username=admin&password=123456
	return request.post<boolean>(MainTenace + `/Denomination/UpdateDenomination`, qs.stringify(params)); // post requests carry form parameters ==> application/x-www-form-urlencoded
};
